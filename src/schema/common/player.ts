import { Type, type Static } from '@sinclair/typebox'
import { SNAKE_CASE } from 'schema/regex'

// export const PlayerStat = JsonEnum(
// 	['edge', 'heart', 'iron', 'shadow', 'wits'],
// 	{ $id: '#/$defs/PlayerStat' }
// )

export const PlayerStat = Type.String({
	examples: ['edge', 'heart', 'iron', 'shadow', 'wits'],
	pattern: SNAKE_CASE.source,
	$id: '#/$defs/PlayerStat',
	description:
		'A basic player character stat. The canonical options are `edge`, `heart`, `iron`, `shadow`, and `wits`.'
})
export type PlayerStat = Static<typeof PlayerStat>
// export const PlayerConditionMeter = JsonEnum(['health', 'spirit', 'supply'], {
// 	$id: '#/$defs/PlayerConditionMeter'
// })

export const PlayerConditionMeter = Type.String({
	$id: '#/$defs/PlayerConditionMeter',
	pattern: SNAKE_CASE.source,
	examples: ['health', 'spirit', 'supply'],
	description:
		'A basic, rollable player character resource. The canonical options are `health`, `spirit`, and `supply`.'
})
export type PlayerConditionMeter = Static<typeof PlayerConditionMeter>
