import { Schema } from '@schema-json'
import { type JSONSchema7 } from 'json-schema'
import * as Paths from './paths'

interface SchemaOptions {
	name: string
	schema: JSONSchema7
	path: string
	messages: {
		start: string
		finish: string
	}
}

const $schema = 'http://json-schema.org/draft-07/schema#'

const schemaOptions: SchemaOptions[] = [
	{
		name: 'Dataforged',
		schema: { $schema, ...Schema.Dataforged },
		path: Paths.DF_SCHEMA_OUT,
		messages: {
			start: 'Writing Starforged-compatible schema for Dataforged',
			finish: 'Finished writing schema for Dataforged'
		}
	},
	{
		name: 'DataforgedInput',
		schema: { $schema, ...Schema.DataforgedInput },
		path: Paths.DF_SCHEMA_IN,
		messages: {
			start: 'Writing Starforged-compatible schema for Dataforged YAML input',
			finish: 'Finished writing schema for Dataforged YAML input'
		}
	},
	{
		name: 'Datasworn',
		schema: { $schema, ...Schema.Datasworn },
		path: Paths.DS_SCHEMA_OUT,
		messages: {
			start: 'Writing Ironsworn-compatible schema for Datasworn',
			finish: 'Finished writing schema for Datasworn'
		}
	},
	{
		name: 'DataswornInput',
		schema: { $schema, ...Schema.DataswornInput },
		path: Paths.DS_SCHEMA_IN,
		messages: {
			start: 'Writing Ironsworn-compatible schema for Datasworn YAML input',
			finish: 'Finished writing schema for Datasworn YAML input'
		}
	}
]

export { schemaOptions }
