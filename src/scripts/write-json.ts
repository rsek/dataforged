import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import * as StarforgedInput from 'data-in/starforged-input.schema.json'
import * as Starforged from 'data-out/starforged.schema.json'
import * as ClassicInput from 'data-in/classic-input.schema.json'
import * as Classic from 'data-out/classic.schema.json'

import fs from 'fs-extra'
import fastGlob from 'fast-glob'
import YAML from 'js-yaml'
import { transform } from 'builders/transformer'

import type * as In from 'types/input'

import { SourcebookClassic, SourcebookStarforged } from 'builders/sourcebook'
import { capitalize, forEach, merge, pick, omit } from 'lodash'
import { type Out } from 'types'
import path from 'path'
import { log } from 'scripts/logger'
import { getPrettierOptions } from 'scripts/getPrettierOptions'
import * as Prettier from 'prettier'
import { type Ruleset } from 'schema/common/metadata'

export const DIR_IN = 'src/data-in'
export const DIR_OUT = 'src/data-out'
export const ajv = new Ajv({
	// remove properties not defined in the schema object.
	removeAdditional: 'failing',
	// assign defaults from the schema to the validated data properties.
	useDefaults: true,
	strictSchema: 'log',
	verbose: true,
	logger: log
})

addFormats(ajv)

forEach(
	{ StarforgedInput, Starforged, ClassicInput, Classic },
	async (v, k) => {
		await ajv.validateSchema(v as any, true)
		ajv.addSchema(v as any, k)
	}
)

type SourcebookIn =
	| In.Classic.SourcebookClassic
	| In.Starforged.SourcebookStarforged

type SourcebookOut =
	| Out.Classic.SourcebookClassic
	| Out.Starforged.SourcebookStarforged

async function buildFile(filePath: string) {
	log.info(`Building from ${filePath}`)
	const data = YAML.load(await fs.readFile(filePath, { encoding: 'utf8' }), {
		// ensures that dates are serialized as strings rather than Date objects (which prevents AJV from validating them)
		schema: YAML.JSON_SCHEMA,
		filename: filePath
	}) as SourcebookIn

	let transformer

	switch (data.ruleset) {
		case 'classic':
			transformer = SourcebookClassic
			break
		case 'starforged':
			transformer = SourcebookStarforged
			break
		default:
			throw new Error(`Data has an invalid 'ruleset' key`)
	}

	const schemaIn = `${capitalize(data.ruleset)}Input`

	if (!ajv.validate(schemaIn, data)) {
		log.error(`${JSON.stringify(ajv.errors, undefined, '\t')}`)
		throw new Error(
			`YAML data in ${filePath} doesn't match the ${schemaIn} schema`
		)
	}

	const out = transform<SourcebookIn, SourcebookOut>(
		data,
		data.id,
		data,
		transformer as any
	)

	const schemaOut = capitalize(data.ruleset)
	if (!ajv.validate(schemaOut, out)) {
		log.error(`${JSON.stringify(ajv.errors, undefined, '\t')}`)
		const errorPath = `src/data-out/${data.ruleset}/error-out.json`
		fs.writeFile(errorPath, JSON.stringify(out, undefined, '\t'), log.error)
		throw new Error(
			`Transformed data doesn't match the ${schemaOut} schema. Dumping invalid JSON to: ${errorPath}`
		)
	}
	return out
}

async function buildSourcebook(ruleset: Ruleset, id: string) {
	const sourcebook: Record<string, Record<string, unknown>> = {}

	const rootIn = path.join(DIR_IN, ruleset, id)
	const rootOut = path.join(DIR_OUT, ruleset, id)
	const globIn = `${rootIn}/**/*.yaml`
	const globOut = `${rootOut}/**/*.json`
	const oldFiles = fastGlob(globOut)

	const yamlFiles = await fastGlob(globIn)

	if (yamlFiles.length === 0)
		throw new Error(
			`Could not find any YAML files with the glob ${rootIn}/**/*.yaml`
		)

	log.info(`Found ${yamlFiles.length} YAML files in ${rootIn}`)

	if ((await oldFiles).length > 0) {
		log.info(`Deleting ${(await oldFiles).length} old JSON files`)
		// flush old files from outdir
		for await (const filePath of await oldFiles) {
			await fs.unlink(filePath)
		}
	}
	for await (const filePath of yamlFiles) {
		const data = await buildFile(filePath)

		if (data.ruleset !== ruleset)
			throw new Error(`Expected ruleset "${ruleset}" but got "${data.ruleset}"`)
		if (data.id !== id)
			throw new Error(
				`Expected sourcebook with ID "${id}" but got "${data.id}"`
			)

		merge(sourcebook, data)
	}
	const metadataKeys = ['source', 'id', 'ruleset']

	const sourcebookMetadata = omit(pick(sourcebook, metadataKeys), 'source.page')

	const prettierOptions = await getPrettierOptions(
		path.join(rootOut, 'any.json')
	)

	// exclude metadata keys
	for await (const [k, v] of Object.entries(sourcebook)) {
		if (metadataKeys.includes(k)) continue
		if (Object.keys(v).length === 0) continue

		const dataOut = Prettier.format(
			JSON.stringify({ ...sourcebookMetadata, [k]: v }, undefined, '\t'),
			prettierOptions
		)

		const outPath = path.join(rootOut, `${k}.json`)

		log.info(`Writing data to ${outPath}`)
		await fs.ensureFile(outPath)
		await fs.writeFile(outPath, dataOut)
	}
}

// TODO: invert the logic for this so that it infers from directory structure

buildSourcebook('starforged', 'starforged').catch((e) => log.info(e))

buildSourcebook('classic', 'classic').catch((e) => log.info(e))
buildSourcebook('classic', 'delve').catch((e) => log.info(e))
