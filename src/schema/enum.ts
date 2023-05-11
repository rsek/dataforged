import { ProgressTypeClassic } from 'schema/ruleset-classic/progress'
import { ProgressTypeStarforged } from 'schema/ruleset-starforged/progress'
import { type Static, UnionOneOf } from 'typebox'
import {
	ChallengeRank,
	PlayerConditionMeter,
	PlayerStat
} from 'schema/common/enum'

export const ProgressType = UnionOneOf(
	[ProgressTypeClassic, ProgressTypeStarforged],
	{ $id: '#/$defs/ProgressType' }
)
export type ProgressType = Static<typeof ProgressType>

export * from 'schema/ruleset-classic/progress'
export * from 'schema/ruleset-starforged/progress'
export { ChallengeRank, PlayerConditionMeter, PlayerStat }
