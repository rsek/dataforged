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
import { capitalize, forEach, merge, pick, set } from 'lodash'
import { type Out } from 'types'
import path from 'path'
import { log } from 'scripts/logger'
import { type Ruleset } from 'schema/ruleset-starforged'

export const DIR_IN = 'src/data-in'
export const DIR_OUT = 'src/data-out'
export const ajv = new Ajv({
	// remove properties not defined in the schema object.
	removeAdditional: 'failing',
	// assign defaults from the schema to the validated data properties.
	useDefaults: true,
	// change data type, when possible, to match the type(s) in the schema.
	coerceTypes: true,
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
	const sourcebook: Record<string, unknown> = {}

	const rootIn = path.join(DIR_IN, ruleset, id)
	const rootOut = path.join(DIR_OUT, ruleset, id)

	const filePaths = await fastGlob(`${rootIn}/**/*.yaml`)

	// TODO: flush the out dir

	log.info(`Found ${filePaths.length} YAML files in ${rootIn}`)

	for await (const filePath of filePaths) {
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

	const sourcebookMetadata = set(
		pick(sourcebook, metadataKeys),
		'source.page',
		undefined
	)
	// exclude metadata keys
	for await (const [k, v] of Object.entries(sourcebook)) {
		if (metadataKeys.includes(k)) continue
		const dataOut = { ...sourcebookMetadata, [k]: v }
		const outPath = path.join(rootOut, `${k}.json`)
		log.info(`Writing data to ${outPath}`)
		await fs.ensureFile(outPath)
		await fs.writeFile(outPath, JSON.stringify(dataOut, undefined, '\t'))
	}
}

// TODO: invert the logic for this so that it infers from directory structure

buildSourcebook('starforged', 'starforged').catch((e) => log.info(e))

buildSourcebook('classic', 'classic').catch((e) => log.info(e))
buildSourcebook('classic', 'delve').catch((e) => log.info(e))
