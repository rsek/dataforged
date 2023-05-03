import { type Static, Type } from '@sinclair/typebox'
import { IntegerEnum, StringEnum } from 'base-types/utils'

export const ProgressTypeCommon = StringEnum([
	'combat_progress',
	'vow_progress',
	'scene_challenge_progress'
])

export type ProgressTypeCommon = Static<typeof ProgressTypeCommon>

export const ChallengeRank = IntegerEnum([1, 2, 3, 4, 5], {
	$id: 'ChallengeRank'
})
export type ChallengeRank = Static<typeof ChallengeRank>
