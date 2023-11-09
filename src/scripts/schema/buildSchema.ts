/**
 * Regenerates schema for YAML input and writes it to file
 */

import prettier from 'prettier'
import fs from 'fs-extra'
import { log } from '../utils/logger.js'
import ajv from '../validation/ajv.js'
import { getPrettierOptions } from '../utils/prettier.js'
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
			writeStart: 'Writing schema for Datasworn',
			writeFinish: 'Finished writing schema for Datasworn'
		}
	},
	{
		name: 'DataswornInput',
		schema: Schema.DataswornInput.getSchema() as JsonSchema,
		paths: [CONST.SCHEMA_IN],
		messages: {
			writeStart: 'Writing schema for Datasworn YAML input',
			writeFinish: 'Finished writing schema for Datasworn YAML input'
		}
	}
]

for await (const options of schemaOptions) {
	ajv.addSchema(options.schema, options.name)

	log.info(options.messages.writeStart)

	// FIXME this could probably stand to be more precise
	const prettierOptions = await getPrettierOptions(options.paths[0])

	try {
		for await (const path of options.paths)
			await fs
				.writeFile(
					path,
					prettier.format(
						JSON.stringify(ajv.getSchema(options.name)?.schema),
						prettierOptions
					)
				)
				.then(() => log.info(options.messages.writeFinish))
	} catch (error) {
		log.error(error)
		for await (const path of options.paths)
			await fs.writeFile(path, JSON.stringify(options.schema, undefined, '\t'))
	}
}
