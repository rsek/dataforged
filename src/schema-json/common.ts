// import { type JSONSchemaType as Schema } from 'ajv'
import { type JSONSchemaType as Schema } from 'schema-json/clean-types'
import { type PartialSchema } from 'ajv/dist/types/json-schema'
import _ from 'lodash'

export const DF_KEY = /^[a-z][a-z_]*[a-z]$/.source

export function refSchema<T>(defName: string) {
	// ensures that the schema with the reference behaves
	const schema = { $ref: `#/definitions/${defName}` }
	return schema as Schema<T>
}

type DictionaryOptions<TValue> = Omit<
	PartialSchema<Record<string, TValue>>,
	'type' | '$comment' | 'patternProperties'
>

/**
 * Creates a schema for a dictionary-like object.
 * @param schema - Schema for individual dictionary options.
 * @param options - Additional properties for the dictionary's schema.
 */
export function dictionarySchema<TValue>(
	schema: Schema<TValue>,
	options?: DictionaryOptions<TValue>
): Schema<Record<string, TValue>> {
	const dictionarySchema = _.merge(
		{
			type: 'object',
			$comment: 'Deserialize as a "dictionary"-like object.',
			patternProperties: {
				[DF_KEY]: schema
			}
		},
		options ?? {}
	)
	return dictionarySchema as Schema<Record<string, TValue>> &
		typeof dictionarySchema
}
