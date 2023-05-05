import { Utils } from 'base-types/common'
import { type Static } from '@sinclair/typebox'

export const PlayerStat = Utils.StringEnum(
	['edge', 'heart', 'iron', 'shadow', 'wits'],
	{ $id: '#/$defs/PlayerStat' }
)
export type PlayerStat = Static<typeof PlayerStat>

export const PlayerConditionMeter = Utils.StringEnum(
	['health', 'spirit', 'supply'],
	{
		$id: '#/$defs/PlayerConditionMeter'
	}
)
export type PlayerConditionMeter = Static<typeof PlayerConditionMeter>

export const ChallengeRank = Utils.IntegerEnum([1, 2, 3, 4, 5], {
	$id: '#/$defs/ChallengeRank',
	description:
		'Challenge rank, represented as a number: 1 = Troublesome, 2 = Dangerous, 3 = Formidable, 4 = Extreme, 5 = Epic'
})
export type ChallengeRank = Static<typeof ChallengeRank>
