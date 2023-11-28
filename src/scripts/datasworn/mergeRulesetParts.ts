import { merge } from 'lodash-es'
import { type Out } from '../../types/index.js'
import type AJV from '../validation/ajv.js'

export function mergeRulesetParts(
	data: Map<string, Out.Datasworn>,
	ajv: typeof AJV
) {
	const ruleset: Out.Datasworn = {}

	const entries = Array.from(data.entries())
		// sort by file name so that they merge in the same order every time (prevents JSON diff noise). the order itself is arbitrary, but must be the same no matter who runs it.
		.sort(([a], [b]) => a.localeCompare(b, 'en-US'))

	for (const [filePath, data] of entries) {
		ajv.validate('Datasworn', data)
		merge(ruleset, data)
	}

	// console.log(ruleset)

	return ruleset
}
