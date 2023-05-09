import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import * as StarforgedInput from 'data-in/dataforged/starforged-input.schema.json'
import * as Starforged from 'data-out/dataforged/starforged.schema.json'
import * as ClassicInput from 'data-in/datasworn/classic-input.schema.json'
import * as Classic from 'data-out/datasworn/classic.schema.json'

import { writeFileSync } from 'fs'
import fastGlob from 'fast-glob'
import YAML from 'js-yaml'
import { transform } from 'builders/transformer'

import type * as In from 'types/input'

// logger.info(JSON.stringify(encData, undefined, '\t'))
import { readFile, writeFile } from 'fs/promises'
import { SourcebookClassic, SourcebookStarforged } from 'builders/sourcebook'
import { capitalize, forEach, merge } from 'lodash'
import { type Out } from 'types'
import path from 'path'
import { type ValueOf } from 'type-fest'
import { log } from 'scripts/logger'

export const YAML_DIR = 'src/data-in'
export const OUT_DIR = 'src/data-out'
export const ajv = new Ajv({
	removeAdditional: true,
	// useDefaults: true,
	strictSchema: false,
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
	const data = YAML.load(await readFile(filePath, { encoding: 'utf8' }), {
		// ensures that dates are serialized as strings rather than Date objects (which prevents AJV from validating them)
		schema: YAML.JSON_SCHEMA
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
	const schemaOut = capitalize(data.ruleset)

	if (!ajv.validate(schemaIn, data)) {
		throw new Error(
			`YAML data in ${filePath} doesn't match the ${schemaIn} schema`
		)
	}

	const result = transform<SourcebookIn, SourcebookOut>(
		data,
		data.id,
		data,
		transformer as any
	)

	if (!ajv.validate(schemaOut, result)) {
		writeFileSync(
			'src/data-out/dataforged/error-out.json',
			JSON.stringify(result, undefined, '\t')
		)
		throw new Error(`Transformed data doesn't match the ${schemaOut} schema`)
	}
	return result
}

const sourcebook = new Map<string, ValueOf<SourcebookOut>>()

fastGlob(`${YAML_DIR}/dataforged/starforged/**/*.yaml`)
	.then(async (filePaths) => {
		log.info(`Found ${filePaths.length} YAML files`)
		// TODO: by ID
		for await (const filePath of filePaths) {
			const data = await buildFile(filePath)
			log.info(filePath)
			forEach(data, (v, k) => {
				if (sourcebook.has(k)) sourcebook.set(k, merge(sourcebook.get(k), v))
				else sourcebook.set(k, v)
			})
		}
		for await (const [k, v] of sourcebook) {
			await writeFile(
				path.join(OUT_DIR, 'dataforged', `${k}.json`),
				JSON.stringify(v, undefined, '\t')
			)
		}
	})
	.catch((e) => {
		log.info(e)
	})
