import { type Static } from '@sinclair/typebox'
import * as Utils from 'base-types/utils'

export const ProgressTypeCommon = Utils.StringEnum(
	['combat_progress', 'vow_progress', 'scene_challenge_progress'],
	{ $ref: '#/$defs/ProgressType' }
)

export type ProgressTypeCommon = Static<typeof ProgressTypeCommon>

export const ChallengeRank = Utils.IntegerEnum([1, 2, 3, 4, 5], {
	$id: '#/$defs/ChallengeRank',
	description:
		'Challenge rank, represented as a number: 1 = Troublesome, 2 = Dangerous, 3 = Formidable, 4 = Extreme, 5 = Epic'
})
export type ChallengeRank = Static<typeof ChallengeRank>
