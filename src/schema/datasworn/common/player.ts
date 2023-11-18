import { Type, type Static } from '@sinclair/typebox'
import { DictKey } from './id.js'

export const PlayerStat = Type.Ref(DictKey, {
	examples: ['edge', 'heart', 'iron', 'shadow', 'wits'],
	$id: '#/$defs/PlayerStat',
	description: 'A basic player character stat.'
})
export type PlayerStat = Static<typeof PlayerStat>

export const PlayerConditionMeter = Type.Ref(DictKey, {
	$id: '#/$defs/PlayerConditionMeter',
	examples: ['health', 'spirit', 'supply'],
	description: 'A basic, rollable player character resource.'
})
export type PlayerConditionMeter = Static<typeof PlayerConditionMeter>
