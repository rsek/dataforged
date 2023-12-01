import { merge } from 'lodash-es'
import type * as Out from '../../types/Datasworn.js'
import { sortDataswornKeys } from './sort.js'

export function mergeRulesetData(data: Map<string, Datasworn.RulesPackage>) {
	const ruleset = {} as Datasworn.RulesPackage

	const entries = Array.from(data.entries())
		// sort by file name so that they merge in the same order every time (prevents JSON diff noise). the order itself is arbitrary, but must be the same no matter who runs it.
		.sort(([a], [b]) => a.localeCompare(b, 'en-US'))

	for (const [_, data] of entries) {
		merge(ruleset, data)
	}

	return sortDataswornKeys(ruleset)
}
