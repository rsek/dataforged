/**
 * Regenerates the schemas and write them to file.
 */

import { log } from '../utils/logger.js'
import ajv from '../validation/ajv.js'
import { getPrettierOptions, writeJSON } from '../datasworn/readWrite.js'
import * as Schema from './schema-root.js'
import * as CONST from '../const.js'
import { type JsonSchema } from 'json-schema-library'

interface SchemaOptions {
	name: string
	schema: JsonSchema
	paths: string[]
	messages: {
		writeStart: string
		writeFinish: string
	}
}

const schemaOptions: SchemaOptions[] = [
	{
		name: 'Datasworn',
		schema: Schema.Datasworn.getSchema() as JsonSchema,
		paths: [CONST.SCHEMA_OUT],
		messages: {
			writeStart: '✏️  Writing schema for Datasworn',
			writeFinish: '✅ Finished writing schema for Datasworn'
		}
	},
	{
		name: 'DataswornInput',
		schema: Schema.DataswornInput.getSchema() as JsonSchema,
		paths: [CONST.SCHEMA_IN],
		messages: {
			writeStart: '✏️  Writing schema for Datasworn YAML input',
			writeFinish: '✅ Finished writing schema for Datasworn YAML input'
		}
	}
]

const prettierOptions = await getPrettierOptions(CONST.SCHEMA_OUT)

for (const options of schemaOptions) {
	ajv.addSchema(options.schema, options.name)

	log.info(options.messages.writeStart)

	try {
		for (const path of options.paths)
			writeJSON(path, ajv.getSchema(options.name)?.schema, {
				prettierOptions
			}).then(() => log.info(options.messages.writeFinish))
	} catch (error) {
		log.error(error)

		for (const path of options.paths)
			writeJSON(path, options.schema, { prettierOptions })
	}
}
