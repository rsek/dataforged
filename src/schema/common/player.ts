import { Type, type Static } from '@sinclair/typebox'
import { SNAKE_CASE } from './regex.js'

export const PlayerStat = Type.String({
	examples: ['edge', 'heart', 'iron', 'shadow', 'wits'],
	pattern: SNAKE_CASE.source,
	$id: '#/$defs/PlayerStat',
	description: 'A basic player character stat.'
})
export type PlayerStat = Static<typeof PlayerStat>

export const PlayerConditionMeter = Type.String({
	$id: '#/$defs/PlayerConditionMeter',
	pattern: SNAKE_CASE.source,
	examples: ['health', 'spirit', 'supply'],
	description: 'A basic, rollable player character resource.'
})
export type PlayerConditionMeter = Static<typeof PlayerConditionMeter>
