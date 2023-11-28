import { type JsonValidator } from 'json-schema-library'
import { FORMATS } from './formats.js'
import { KEYWORDS } from './keywords.js'

// TODO: have these do actual validation instead of skipping it
export const validateFormat = Object.fromEntries(
	Object.keys(FORMATS).map<[string, JsonValidator]>((k) => [k, () => undefined])
)

export const validateKeyword = Object.fromEntries(
	Object.entries(KEYWORDS).map<[string, JsonValidator]>(([k, v]) => {
		const fn = v.metaSchema != null ? () => undefined : () => undefined
		return [k, fn]
	})
)
