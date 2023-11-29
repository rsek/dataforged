import { merge } from 'lodash-es'
import { type Out } from '../../types/index.js'
import { sortDataswornKeys } from './sort.js'

export function mergeRulesetData(data: Map<string, Out.Datasworn>) {
	const ruleset: Out.Datasworn = {}

	const entries = Array.from(data.entries())
		// sort by file name so that they merge in the same order every time (prevents JSON diff noise). the order itself is arbitrary, but must be the same no matter who runs it.
		.sort(([a], [b]) => a.localeCompare(b, 'en-US'))

	for (const [_, data] of entries) {
		merge(ruleset, data)
	}

	return sortDataswornKeys(ruleset)
}
