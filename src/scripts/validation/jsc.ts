import JsonSchema, { type JSONValidator } from 'json-schema-library'
import fs from 'fs-extra'
import * as CONST from '../const.js'
import { FORMATS } from './formats.js'
import { KEYWORDS } from './keywords.js'

// TODO: have these do actual validation instead of skipping it
const validateFormat = Object.fromEntries(
	Object.keys(FORMATS).map<[string, JSONValidator]>((k) => [k, () => undefined])
)

const validateKeyword = Object.fromEntries(
	Object.entries(KEYWORDS).map<[string, JSONValidator]>(([k, v]) => {
		const fn = v.metaSchema != null ? () => undefined : () => undefined
		return [k, fn]
	})
)

export const input = new JsonSchema.Draft07(fs.readJSONSync(CONST.SCHEMA_IN), {
	validateFormat,
	validateKeyword
})

export const output = new JsonSchema.Draft07(
	fs.readJSONSync(CONST.SCHEMA_OUT),
	{
		validateFormat,
		validateKeyword
	}
)
