import JsonSchema from 'json-schema-library'
import { Datasworn } from '../types/io/datasworn.js'
import oracles from '../data-out/classic/oracles.json' assert { type: 'json' }
import moves from '../data-out/classic/moves.json' assert { type: 'json' }
import assets from '../data-out/classic/assets.json' assert { type: 'json' }
import npcs from '../data-out/classic/npcs.json' assert { type: 'json' }
import truths from '../data-out/classic/truths.json' assert { type: 'json' }
import atlas from '../data-out/classic/atlas.json' assert { type: 'json' }

import schema from '../data-out/datasworn.schema.json' assert { type: 'json' }
import JSONPointer from 'jsonpointer'

const sep = '/'

// 	const validator: JsonSchema.JSONSchema = await fs.readJSON(SCHEMA_OUT, )

function getParentPointer(pointer: string) {
	let parts = pointer.split(sep)
	parts.pop()
	return parts.join(sep)
}

function synthesizeId(
	pointer: string,
	source: Datasworn,
	parts: string[] = []
) {
	const parentPointer = getParentPointer(pointer)
	const key = pointer.split(sep).pop()

	const parent = JSONPointer.get(source, parentPointer)

	if (typeof parent === 'undefined')
		throw new Error(`Pointer ${parentPointer} doesn't exist`)

	parts.unshift(key)

	if (typeof parent.id === 'string')
		return [parent.id as string, ...parts].join('.')

	return synthesizeId(parentPointer, source, parts)
}

export function extractLocaleStrings(
	source: Datasworn,
	validator: JsonSchema.Draft07,
	localeStrings = new Map<string, string>()
) {
	validator.each(source, (schema, data, pointer) => {
		if (schema.i18n === true && typeof data === 'string' && data.length) {
			const cleanPointer = pointer.replace('#', '')
			localeStrings.set(synthesizeId(cleanPointer, source), data)
		}
	})

	return localeStrings
}

const result = new Map<string, string>()

const validator = new JsonSchema.Draft07(schema as any)

for (const json of [atlas, assets, moves, npcs, oracles, truths])
	extractLocaleStrings(json as any, validator, result)

const commonStrings = new Map<string, string[]>()

for (const [pointer, keyLocaleString] of result) {
	if (commonStrings.has(keyLocaleString))
		commonStrings.set(keyLocaleString, [
			...(commonStrings.get(keyLocaleString) as string[]),
			pointer
		])
	else commonStrings.set(keyLocaleString, [pointer])
}

// console.log(result)

const dupeStrings = new Map<string, string[]>()

for (const [localeString, ids] of commonStrings) {
	// if (ids.length > 1)
	dupeStrings.set(localeString, ids)
}

console.log(dupeStrings)
