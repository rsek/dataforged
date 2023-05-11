import { type Static } from '@sinclair/typebox'
import { JsonEnum } from 'typebox'

export const PlayerStat = JsonEnum(
	['edge', 'heart', 'iron', 'shadow', 'wits'],
	{ $id: '#/$defs/PlayerStat' }
)
export type PlayerStat = Static<typeof PlayerStat>

export const PlayerConditionMeter = JsonEnum(['health', 'spirit', 'supply'], {
	$id: '#/$defs/PlayerConditionMeter'
})
export type PlayerConditionMeter = Static<typeof PlayerConditionMeter>

export const ChallengeRank = JsonEnum([1, 2, 3, 4, 5], {
	$id: '#/$defs/ChallengeRank',
	description:
		'Challenge rank, represented as a number: 1 = Troublesome, 2 = Dangerous, 3 = Formidable, 4 = Extreme, 5 = Epic'
})
export type ChallengeRank = Static<typeof ChallengeRank>
