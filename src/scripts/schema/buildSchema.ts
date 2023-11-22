/**
 * Regenerates the schemas and write them to file.
 */

import JsonPointer from 'json-pointer'
import { type JsonSchema } from 'json-schema-library'
import { type TRoot } from '../../schema/datasworn/Root.js'
import * as CONST from '../const.js'
import { getPrettierOptions, writeJSON } from '../datasworn/readWrite.js'
import { sortSchemaKeys } from '../datasworn/sort.js'
import { log } from '../utils/logger.js'
import ajv from '../validation/ajv.js'
import * as Schema from './schema-root.js'

import JSL from 'json-schema-library'

const draft7 = new JSL.Draft07()

interface SchemaOptions {
	name: string
	rootSchema: TRoot
	paths: string[]
	messages: {
		writeStart: string
		writeFinish: string
	}
}

const schemaOptions: SchemaOptions[] = [
	{
		name: 'Datasworn',
		rootSchema: Schema.Datasworn,
		paths: [CONST.SCHEMA_OUT],
		messages: {
			writeStart: '✏️  Writing schema for Datasworn',
			writeFinish: '✅ Finished writing schema for Datasworn'
		}
	},
	{
		name: 'DataswornInput',
		rootSchema: Schema.DataswornInput,
		paths: [CONST.SCHEMA_IN],
		messages: {
			writeStart: '✏️  Writing schema for Datasworn YAML input',
			writeFinish: '✅ Finished writing schema for Datasworn YAML input'
		}
	}
]

const prettierOptions = await getPrettierOptions(CONST.SCHEMA_OUT)

for (const options of schemaOptions) {
	ajv.addSchema(options.rootSchema as JsonSchema, options.name)

	log.info(options.messages.writeStart)

	try {
		for (const path of options.paths) {
			let sortedSchema: Record<string, unknown> = {}

			draft7.eachSchema((schema, hashPointer) => {
				const pointer = hashPointer.replace(/^#/, '/')
				const newSchema = sortSchemaKeys(JSON.parse(JSON.stringify(schema)))

				if (pointer === '/') sortedSchema = newSchema
				else JsonPointer.set(sortedSchema, pointer, newSchema)
			}, options.rootSchema)

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
			writeJSON(path, options.rootSchema, { prettierOptions })
	}
}
