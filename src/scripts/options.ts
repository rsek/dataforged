import { Schema } from 'schema'
import { type JSONSchema7 } from 'json-schema'
import * as Paths from './paths'
import { TypeBuilder } from '@sinclair/typebox'
import { mapValues } from 'lodash'

interface SchemaOptions {
	name: string
	schema: JSONSchema7
	path: string
	messages: {
		start: string
		finish: string
	}
}

function cleanSchema(schema: JSONSchema7) {
	const data = JSON.parse(JSON.stringify(schema)) as JSONSchema7
	if (data.$defs == null) throw new Error('Schema is missing $defs')

	data.$defs = mapValues(data.$defs, (value) => {
		delete (value as any).$id
		return value
	})

	return data
}

const schemaOptions: SchemaOptions[] = [
	{
		name: 'Dataforged',
		schema: cleanSchema(Schema.Dataforged),
		path: Paths.DF_SCHEMA_OUT,
		messages: {
			start: 'Writing Starforged-compatible schema for Dataforged',
			finish: 'Finished writing schema for Dataforged'
		}
	},
	{
		name: 'DataforgedInput',
		schema: cleanSchema(Schema.DataforgedInput),
		path: Paths.DF_SCHEMA_IN,
		messages: {
			start: 'Writing Starforged-compatible schema for Dataforged YAML input',
			finish: 'Finished writing schema for Dataforged YAML input'
		}
	},
	{
		name: 'Datasworn',
		schema: cleanSchema(Schema.Datasworn),
		path: Paths.DS_SCHEMA_OUT,
		messages: {
			start: 'Writing Ironsworn-compatible schema for Datasworn',
			finish: 'Finished writing schema for Datasworn'
		}
	},
	{
		name: 'DataswornInput',
		schema: cleanSchema(Schema.DataswornInput),
		path: Paths.DS_SCHEMA_IN,
		messages: {
			start: 'Writing Ironsworn-compatible schema for Datasworn YAML input',
			finish: 'Finished writing schema for Datasworn YAML input'
		}
	}
]

export { schemaOptions }
