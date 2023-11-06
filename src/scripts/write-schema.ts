/**
 * Regenerates schema for YAML input and writes it to file
 */

import prettier from 'prettier'
import { writeFile, writeFileSync } from 'fs-extra'
import { log } from './logger.js'
import ajv from './ajv.js'
import { getPrettierOptions } from './prettier.js'
import * as Schema from './schema-root.js'
import * as CONST from './const.js'
import { type JSONSchema } from 'json-schema-library'

interface SchemaOptions {
	name: string
	schema: JSONSchema
	paths: string[]
	messages: {
		writeStart: string
		writeFinish: string
	}
}

const schemaOptions: SchemaOptions[] = [
	{
		name: 'Datasworn',
		schema: Schema.Datasworn.getSchema(),
		paths: [CONST.SCHEMA_OUT],
		messages: {
			writeStart: 'Writing schema for Datasworn',
			writeFinish: 'Finished writing schema for Datasworn'
		}
	},
	{
		name: 'DataswornInput',
		schema: Schema.DataswornInput.getSchema(),
		paths: [CONST.SCHEMA_IN],
		messages: {
			writeStart: 'Writing schema for Datasworn YAML input',
			writeFinish: 'Finished writing schema for Datasworn YAML input'
		}
	}
]

for (const options of schemaOptions) {
	ajv.addSchema(options.schema, options.name)
	// FIXME this could probably stand to be more precise
	getPrettierOptions(options.paths[0])
		.then(async (prettierOptions) => {
			log.info(options.messages.writeStart)
			for (const path of options.paths)
				await writeFile(
					path,
					prettier.format(
						JSON.stringify(ajv.getSchema(options.name)?.schema),
						prettierOptions
					)
				)
		})
		.then(() => log.info(options.messages.writeFinish))
		.catch(async (e) => {
			log.error(e)
			for (const path of options.paths)
				await writeFile(path, JSON.stringify(options.schema, undefined, '\t'))
		})
}
