/**
 * Regenerates schema for YAML input and writes it to file
 */

import prettier from 'prettier'
import { writeFile } from 'fs-extra'
import { log } from './logger'
import ajv from 'scripts/ajv'
import { getPrettierOptions } from './prettier'
import { Schema } from 'schema'
import * as Paths from './paths'
import { type JSONSchema7 } from 'json-schema'

interface SchemaOptions {
	name: string
	schema: JSONSchema7
	path: string
	messages: {
		writeStart: string
		writeFinish: string
	}
}

const schemaOptions: SchemaOptions[] = [
	{
		name: 'Dataforged',
		schema: Schema.Dataforged,
		path: Paths.DF_SCHEMA_OUT,
		messages: {
			writeStart: 'Writing Starforged-compatible schema for Dataforged',
			writeFinish: 'Finished writing schema for Dataforged'
		}
	},
	{
		name: 'DataforgedInput',
		schema: Schema.DataforgedInput,
		path: Paths.DF_SCHEMA_IN,
		messages: {
			writeStart:
				'Writing Starforged-compatible schema for Dataforged YAML input',
			writeFinish: 'Finished writing schema for Dataforged YAML input'
		}
	},
	{
		name: 'Datasworn',
		schema: Schema.Datasworn,
		path: Paths.DS_SCHEMA_OUT,
		messages: {
			writeStart: 'Writing Ironsworn-compatible schema for Datasworn',
			writeFinish: 'Finished writing schema for Datasworn'
		}
	},
	{
		name: 'DataswornInput',
		schema: Schema.DataswornInput,
		path: Paths.DS_SCHEMA_IN,
		messages: {
			writeStart:
				'Writing Ironsworn-compatible schema for Datasworn YAML input',
			writeFinish: 'Finished writing schema for Datasworn YAML input'
		}
	}
]

for (const options of schemaOptions) {
	ajv.addSchema(options.schema, options.name)
	getPrettierOptions(options.path)
		.then(async (prettierOptions) => {
			log.info(options.messages.writeStart)
			await writeFile(
				options.path,
				prettier.format(
					JSON.stringify(ajv.getSchema(options.name)?.schema),
					prettierOptions
				)
			)
		})
		.then(() => log.info(options.messages.writeFinish))
		.catch(async (e) => {
			log.error(e)
			await writeFile(
				options.path,
				JSON.stringify(options.schema, undefined, '\t')
			)
		})
}
