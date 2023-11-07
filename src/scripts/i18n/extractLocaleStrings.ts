// TODO

import JsonSchema from 'json-schema-library'

import { type Datasworn } from '../../types/io/datasworn.js'

import JSONPointer from 'jsonpointer'

const sep = '/'

function getParentPointer(pointer: string) {
	const parts = pointer.split(sep)
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

	parts.unshift(key as string)

	if (typeof parent.id === 'string')
		return [parent.id as string, ...parts].join('.')

	return synthesizeId(parentPointer, source, parts)
}

export function extractLocaleStrings(
	source: Datasworn,
	validator: JsonSchema.Draft07
) {
	const strings = new Map<string, string>()

	validator.each(source, (schema, data, pointer) => {
		if (schema.i18n === true && typeof data === 'string' && data.length) {
			const cleanPointer = pointer.replace('#', '')
			strings.set(synthesizeId(cleanPointer, source), data)
		}
	})

	// TODO: use tags to distinguish sense/part of speech

	const groupedStrings = new Map<string, string[]>()

	for (const [pointer, keyLocaleString] of strings) {
		if (groupedStrings.has(keyLocaleString))
			groupedStrings.set(keyLocaleString, [
				...(groupedStrings.get(keyLocaleString) as string[]),
				pointer
			])
		else groupedStrings.set(keyLocaleString, [pointer])
	}

	return groupedStrings
}
