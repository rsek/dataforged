import JsonSchema, { type JsonValidator } from 'json-schema-library'
import { loadSchema, loadSourceSchema } from '../schema/loadSchema.js'
import { FORMATS } from './formats.js'
import { KEYWORDS } from './keywords.js'

// TODO: have these do actual validation instead of skipping it
const validateFormat = Object.fromEntries(
	Object.keys(FORMATS).map<[string, JsonValidator]>((k) => [k, () => undefined])
)

const validateKeyword = Object.fromEntries(
	Object.entries(KEYWORDS).map<[string, JsonValidator]>(([k, v]) => {
		const fn = v.metaSchema != null ? () => undefined : () => undefined
		return [k, fn]
	})
)

export const DataswornSourceDraft = new JsonSchema.Draft07(
	await loadSourceSchema(),
	{
		validateFormat,
		validateKeyword
	}
)

export const DataswornDraft = new JsonSchema.Draft07(await loadSchema(), {
	validateFormat,
	validateKeyword
})
