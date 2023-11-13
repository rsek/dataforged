/**
 * Regenerates the schemas and write them to file.
 */

import { log } from '../utils/logger.js'
import ajv from '../validation/ajv.js'
import { getPrettierOptions, writeJSON } from '../datasworn/readWrite.js'
import * as Schema from './schema-root.js'
import * as CONST from '../const.js'
import { Draft07, type JsonSchema } from 'json-schema-library'
import { sortSchemaKeys } from '../datasworn/sort.js'
import JsonPointer from 'json-pointer'

interface SchemaOptions {
	name: string
	draft: Draft07
	paths: string[]
	messages: {
		writeStart: string
		writeFinish: string
	}
}

const schemaOptions: SchemaOptions[] = [
	{
		name: 'Datasworn',
		draft: Schema.Datasworn,
		paths: [CONST.SCHEMA_OUT],
		messages: {
			writeStart: '✏️  Writing schema for Datasworn',
			writeFinish: '✅ Finished writing schema for Datasworn'
		}
	},
	{
		name: 'DataswornInput',
		draft: Schema.DataswornInput,
		paths: [CONST.SCHEMA_IN],
		messages: {
			writeStart: '✏️  Writing schema for Datasworn YAML input',
			writeFinish: '✅ Finished writing schema for Datasworn YAML input'
		}
	}
]

const prettierOptions = await getPrettierOptions(CONST.SCHEMA_OUT)

for (const options of schemaOptions) {
	ajv.addSchema(options.draft.getSchema() as JsonSchema, options.name)

	log.info(options.messages.writeStart)

	try {
		for (const path of options.paths) {
			let sortedSchema: Record<string, unknown> = {}

			options.draft.eachSchema((schema, hashPointer) => {
				let pointer = hashPointer.replace(/^#/, '/')
				const newSchema = sortSchemaKeys(JSON.parse(JSON.stringify(schema)))

				if (pointer === '/') sortedSchema = newSchema
				else JsonPointer.set(sortedSchema, pointer, newSchema)
			})

			// console.log(sortedSchema)

			for (const path of options.paths)
				writeJSON(path, sortedSchema, { prettierOptions })

			writeJSON(path, sortedSchema, {
				prettierOptions
			}).then(() => log.info(options.messages.writeFinish))
		}
	} catch (error) {
		log.error(error)

		for (const path of options.paths)
			writeJSON(path, options.draft.getSchema(), { prettierOptions })
	}
}
