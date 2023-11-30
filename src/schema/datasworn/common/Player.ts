import { Type, type Static } from '@sinclair/typebox'
import { DictKey } from './Id.js'

export const StatKey = Type.Ref(DictKey, {
	examples: ['edge', 'heart', 'iron', 'shadow', 'wits'],
	$id: 'StatKey',
	description: 'A basic player character stat.'
})
export type StatKey = Static<typeof StatKey>

export const ConditionMeterKey = Type.Ref(DictKey, {
	$id: 'ConditionMeterKey',
	examples: ['health', 'spirit', 'supply'],
	description:
		'A basic, rollable player character resource specified by the ruleset.'
})
export type ConditionMeterKey = Static<typeof ConditionMeterKey>
