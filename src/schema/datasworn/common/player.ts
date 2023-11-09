import { Type, type Static } from '@sinclair/typebox'
import { ATTR } from './regex.js'

export const PlayerStat = Type.RegEx(ATTR, {
	examples: ['edge', 'heart', 'iron', 'shadow', 'wits'],
	$id: '#/$defs/PlayerStat',
	description: 'A basic player character stat.'
})
export type PlayerStat = Static<typeof PlayerStat>

export const PlayerConditionMeter = Type.RegEx(ATTR, {
	$id: '#/$defs/PlayerConditionMeter',
	examples: ['health', 'spirit', 'supply'],
	description: 'A basic, rollable player character resource.'
})
export type PlayerConditionMeter = Static<typeof PlayerConditionMeter>
