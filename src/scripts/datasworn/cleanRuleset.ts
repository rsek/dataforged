import JsonPointer from 'json-pointer'
import type * as Out from '../../types/Datasworn.js'
import {
	isSortableObjectSchema,
	sortDataswornKeys,
	unsortableKeys
} from './sort.js'
import { sortTopLevelCollection } from './sortCollection.js'
import { type Draft07 } from 'json-schema-library'

const metadataKeys: string[] = []
export function cleanRuleset(datasworn: Datasworn.RulesPackage, jsl: Draft07) {
	const sortedPointers: Record<string, unknown> = {}

	// sort non-dictionary objects
	jsl.each(datasworn, (schema, value: any, hashPointer) => {
		const sep = '/'

		const nicePointer = hashPointer.replace(/^#\//, sep)

		const key = nicePointer.split(sep).pop() as string

		if (nicePointer === sep) return

		// if (value?.id) console.log(value.id, '=>', nicePointer)

		if (
			value != null &&
			!unsortableKeys.includes(key) &&
			isSortableObjectSchema(schema)
		)
			sortedPointers[nicePointer] = sortDataswornKeys(value)
	})

	// sort collections
	for (const [k, v] of Object.entries(datasworn)) {
		if (metadataKeys.includes(k)) continue
		if (typeof v !== 'object') continue
		if (k === 'rules') continue

		// log.info(`iterating key: ${k}`)
		const result = sortTopLevelCollection(v)

		// console.log(result)
		datasworn[k] = result
	}

	// console.log('pointersToDelete', pointersToDelete)
	// console.log('pointersToSort', pointersToSort)
	const jsonOut = JSON.parse(JSON.stringify(datasworn, replacer))

	// for (const pointer of pointersToDelete)
	// 	if (JsonPointer.has(jsonOut, pointer)) JsonPointer.remove(jsonOut, pointer)
	for (const [pointer, sortedValue] of Object.entries(sortedPointers))
		if (JsonPointer.has(jsonOut, pointer))
			JsonPointer.set(jsonOut, pointer, sortedValue)

	return jsonOut as Datasworn.RulesPackage
}

function replacer(key: string, value: unknown) {
	if (key.startsWith('_')) return undefined
	if (['number', 'boolean', 'string', 'undefined'].includes(typeof value))
		return value
	if (Array.isArray(value)) return value
	return value
}
