import JsonSchema from 'json-schema-library'

import { type Datasworn } from '../../types/io/datasworn.js'
import fastGlob from 'fast-glob'

import JSONPointer from 'jsonpointer'

import fs from 'fs-extra'
import { SCHEMA_OUT, ROOT_OUTPUT } from '../const.js'
import { JSONSchema7 } from 'json-schema'
import path from 'path'

const sep = '/'

const schema = (await fs.readJSON(SCHEMA_OUT)) as JSONSchema7

/** All non-schema json files. */
const jsonPaths = await fastGlob(`${ROOT_OUTPUT}/*/**/*.json`)

const jsonFiles: Record<string, Datasworn> = {}

for await (const jsonPath of jsonPaths) {
	jsonFiles[path.basename(jsonPath, '.json')] = await fs.readJSON(jsonPath)
}

// 	const validator: JsonSchema.JSONSchema = await fs.readJSON(SCHEMA_OUT, )

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

for (const [name, json] of Object.entries(jsonFiles))
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
