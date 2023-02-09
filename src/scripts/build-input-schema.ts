/**
 * Regenerates schema for YAML input and writes it to file
 */

import { writeFileSync } from 'fs'
import { Schema } from '@df-json-schema'
import Ajv from 'ajv'
import path from 'path'
import addFormats from 'ajv-formats'

const ajv = new Ajv.default({ removeAdditional: true })
addFormats.default(ajv)

ajv.addSchema(Schema.DataforgedInput, 'DataforgedInput')
ajv.addSchema(Schema.DataswornInput, 'DataswornInput')

// Write Starforged-compatible schema for Dataforged
const dfOut = path.join(
	process.cwd(),
	'src/data-in/dataforged/schema-dataforged-input.json'
)

// const dfJson = JSON.stringify(Schema.DataforgedInput, undefined, 2)

writeFileSync(
	dfOut,
	JSON.stringify(ajv.getSchema('DataforgedInput')?.schema, undefined, 2)
)

// Write Ironsworn-compatible schema for Datasworn
const dsOut = path.join(
	process.cwd(),
	'./src/data-in/datasworn/schema-datasworn-input.json'
)

// const dsJson = JSON.stringify(Schema.DataswornInput, undefined, 2)

writeFileSync(
	dsOut,
	JSON.stringify(ajv.getSchema('DataswornInput')?.schema, undefined, 2)
)
