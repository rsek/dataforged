import { Type, type Static } from '@sinclair/typebox'
import { DictKey } from './Id.js'

export const StatId = Type.Ref(DictKey, {
	examples: ['edge', 'heart', 'iron', 'shadow', 'wits'],
	$id: 'StatId',
	description: 'A basic player character stat.'
})
export type StatId = Static<typeof StatId>

export const ConditionMeterId = Type.Ref(DictKey, {
	$id: 'ConditionMeterId',
	examples: ['health', 'spirit', 'supply'],
	description: 'A basic, rollable player character resource.'
})
export type ConditionMeterId = Static<typeof ConditionMeterId>
