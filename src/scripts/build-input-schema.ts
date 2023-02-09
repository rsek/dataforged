/**
 * Regenerates schema for YAML input and writes it to file
 */

import { PathLike, writeFileSync } from 'fs'
import { Schema } from '@df-json-schema'
import Ajv from 'ajv'
import path from 'path'
import addFormats from 'ajv-formats'
import prettier from 'prettier'
import _ from 'lodash'

const ajv = new Ajv.default({ removeAdditional: true })
addFormats.default(ajv)

ajv.addSchema(Schema.DataforgedInput, 'DataforgedInput')
ajv.addSchema(Schema.DataswornInput, 'DataswornInput')

// Write Starforged-compatible schema for Dataforged
const dfOut = path.join(
	process.cwd(),
	'src/data-in/dataforged/schema-dataforged-input.json'
)

async function getPrettierOptions(filepath: string) {
	const defaultConfig = (await prettier.resolveConfig(filepath)) ?? {}
	const jsonOverrides: prettier.Options = { filepath, parser: 'json' }
	const prettierOptions = _.merge({}, defaultConfig, jsonOverrides)
	return prettierOptions
}

// const dfJson = JSON.stringify(Schema.DataforgedInput)

writeFileSync(
	dfOut,
	prettier.format(
		JSON.stringify(ajv.getSchema('DataforgedInput')?.schema),
		await getPrettierOptions(dfOut)
	)
)

// Write Ironsworn-compatible schema for Datasworn
const dsOut = path.join(
	process.cwd(),
	'./src/data-in/datasworn/schema-datasworn-input.json'
)

// const dsJson = JSON.stringify(Schema.DataswornInput)

writeFileSync(
	dsOut,
	prettier.format(
		JSON.stringify(ajv.getSchema('DataswornInput')?.schema),
		await getPrettierOptions(dsOut)
	)
)
