import { TAnySchema } from '@sinclair/typebox'
import { JsonSchema } from 'json-schema-library'
import { JSONSchema } from 'json-schema-to-typescript'

const typeKeys = [
	'asset_type',
	'card_type',
	'content_type',
	'field_type',
	'roll_type'
]

const noSort = ['columns', 'controls', 'contents', 'collections']

const dataSwornKeyOrder = [
	'id',
	'title',
	'name',
	'label',
	'canonical_name',
	'color',
	'icon',
	'images',
	...typeKeys,
	'nature',
	'rank',
	'track_label',
	'rendering',
	'table_style',
	'enabled',
	'min',
	'max',
	'value',
	'frequency',
	'options',
	'count_as_impact',
	'shared',
	'attachments',
	'using',
	'trigger',
	'roll',
	'summary',
	'requirement',
	'result',
	'features',
	'dangers',
	'drives',
	'tactics',
	'strong_hit',
	'weak_hit',
	'miss',
	'variants',
	'description',
	'text',
	'abilities',
	'contents',
	'collections',
	'outcomes',
	'quest_starter',
	'your_truths',
	'controls',
	'condition_meter',
	'date',
	'page',
	'authors',
	'source',
	'license',
	'url'
]

export function compareObjectKeys(
	a: string,
	b: string,
	keyOrder: string[] = []
) {
	const [indexA, indexB] = [a, b].map((key) => keyOrder.indexOf(key))

	// if both are the same, fall back to alphabetical order
	if (indexA === indexB) return a.localeCompare(b, 'en-US')

	// if one key lacks an explicit sort, place it last
	if (indexA === -1) return 1
	if (indexB === -1) return -1

	return indexA - indexB
}

export function schemaDescribesSortableValue(schema: JSONSchema) {
	switch (true) {
		// skip non-object schema
		case schema.type !== 'object':
		// skip dictionary-like object
		case schema.patternProperties != null:
			return false

		default:
			return true
	}
}

export function sortDataswornKeys<T extends Record<string, unknown>>(
	object: T
) {
	return sortObjectKeys(object, dataSwornKeyOrder)
}

const schemaKeyOrder = [
	'$id',
	'$ref',
	'title',
	'type',
	'$comment',
	'description',
	'$defs',
	'const',
	'items',
	'required',
	'properties',
	'patternProperties',
	'additionalItems',
	'additionalProperties',
	'allOf',
	'anyOf',
	'oneOf'
]

export function sortSchemaKeys<T extends JSONSchema>(schema: T) {
	// TODO: sort "required" string array by the new property order
	const sortedSchema = sortObjectKeys(schema, schemaKeyOrder)
	if (sortedSchema.properties != null)
		sortedSchema.properties = sortDataswornKeys(sortedSchema.properties)
	if (Array.isArray(sortedSchema.required)) {
		sortedSchema.required = sortedSchema.required.sort((a, b) =>
			compareObjectKeys(a, b, dataSwornKeyOrder)
		)
	}

	return sortedSchema
}

function sortObjectKeys<T extends Record<string, unknown>>(
	object: T,
	keyOrder: string[] = []
) {
	const entries = Object.entries(object).sort(([a], [b]) =>
		compareObjectKeys(a, b, keyOrder)
	)
	return Object.fromEntries(entries) as T
}
