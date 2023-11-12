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

const noSort = ['columns', 'controls', 'moves']

const keyOrder = [
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

export function compareKeys(a: string, b: string, keyOrder: string[] = []) {
	const [indexA, indexB] = [a, b].map((key) => keyOrder.indexOf(key))

	if (indexA === indexB) return a.localeCompare(b, 'en-US')

	if (indexA === -1) return 1
	if (indexB === -1) return -1

	return indexA - indexB
}

export function isSortableSchema(schema: JSONSchema) {
	if (schema.type !== 'object') return true
	// skip dictionary objects
	if (schema.patternProperties != null) return true
	// skip objects with no properties of their own
	if (schema.properties == null) return true
	return false
}

export function sortDataswornKeys<T extends Record<string, unknown>>(
	object: T
) {
	return sortObjectKeys(object, keyOrder)
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
	const result = sortObjectKeys(schema, schemaKeyOrder)
	if (result.properties != null)
		result.properties = sortDataswornKeys(result.properties)
	if (Array.isArray(result.required)) {
		result.required = result.required.sort((a, b) =>
			compareKeys(a, b, keyOrder)
		)
	}

	return result
}

function sortObjectKeys<T extends Record<string, unknown>>(
	object: T,
	keyOrder: string[] = []
) {
	const entries = Object.entries(object).sort(([a], [b]) =>
		compareKeys(a, b, keyOrder)
	)
	return Object.fromEntries(entries) as T
}
