import type * as Types from '@base-types'
import { type Static, Type, TSchema } from '@sinclair/typebox'
import { MoveID, OracleTableID } from 'base-types/id'
import { Label, MarkdownString } from 'base-types/localize'
import { StringEnum } from 'base-types/utils'

export const MoveRerollMethod = StringEnum([
	'any',
	'all',
	'challenge_die',
	'challenge_dice',
	'action_die'
])
export type MoveRerollMethod = Static<typeof MoveRerollMethod>

export const MoveOutcomeType = StringEnum(['miss', 'weak_hit', 'strong_hit'])
export type MoveOutcomeType = Static<typeof MoveOutcomeType>

export const MoveRollType = StringEnum([
	'action_roll',
	'progress_roll',
	'no_roll'
])
export type MoveRollType = Static<typeof MoveRollType>

export const MoveReroll = Type.Object({
	text: Type.Optional(MarkdownString),
	method: MoveRerollMethod
})
export type MoveReroll = Static<typeof MoveReroll>

export const MoveOutcome = Type.Object({
	text: MarkdownString,
	count_as: Type.Optional(MoveOutcomeType),
	reroll: Type.Optional(MoveReroll)
})
export type MoveOutcome = Static<typeof MoveOutcome>

export const MoveOutcomeMatchable = Type.Composite([
	MoveOutcome,
	Type.Object({ match: Type.Optional(MoveOutcome) })
])

export const MoveOutcomes = Type.Object({
	miss: MoveOutcomeMatchable,
	weak_hit: MoveOutcome,
	strong_hit: MoveOutcomeMatchable
})

export const Trigger = <T extends MoveRollType>(t: T) =>
	Type.Object({ roll_type: Type.Literal(t) })

export const Move = Type.Object({
	id: MoveID,
	name: Label,
	oracles: Type.Optional(Type.Array(OracleTableID)),
	text: MarkdownString,
	outcomes: MoveOutcomes,
	trigger: Type.Union(MoveRollType.enum.map((type) => Trigger(type)))
})
export type Move = Static<typeof Move>

// export const MoveExtension =

export interface MoveExtension extends Types.Abstract.ExtendMany<Move> {
	extends: MoveID[] | null
	trigger:
		| Types.Moves.TriggerExtension<'action_roll'>
		| Types.Moves.TriggerExtension<'progress_roll'>
}

// TODO: would match outcomes make sense as ExtendOne?
export interface MoveOutcomeMatchable extends MoveOutcome {
	match?: MoveOutcome
}
export interface MoveOutcomes extends Record<MoveOutcomeType, MoveOutcome> {
	miss: MoveOutcomeMatchable
	weak_hit: MoveOutcome
	strong_hit: MoveOutcomeMatchable
}

export interface Trigger<T extends MoveRollType = MoveRollType> {
	text: Types.Localize.MarkdownString
	roll_type: T
	roll_options?: T extends 'no_roll' ? never : Array<TriggerRollOption<T>>
}

export interface TriggerBy {
	player: boolean
	ally: boolean
}

export interface MoveCategory
	extends Types.Abstract.Collection<Move<MoveRollType>, MoveCategoryID> {
	summary: string
	color: string
}

export type MoveRollMethod =
	| 'any'
	| 'all'
	| 'highest'
	| 'lowest'
	| MoveOutcomeType

export type ProgressType =
	| Types.RulesetStarforged.ProgressType
	| Types.RulesetClassic.ProgressType

export type RollableStatID =
	| Types.Players.PlayerStatID
	| Types.Players.PlayerConditionMeterID
// | Types.RulesetStarforged.ConditionMeterAlias
// | Types.RulesetClassic.ConditionMeterAlias

export type TriggerRollOptionChoice<T extends MoveRollType = MoveRollType> =
	T extends 'progress_roll'
		? TriggerRollOptionProgressChoice
		: T extends 'action_roll'
		? TriggerRollOptionActionChoice
		: never

export interface TriggerRollOptionChoiceBase {
	using:
		| ProgressType
		| Types.Players.PlayerStatLike
		| 'custom_value'
		| 'ref'
		| 'attached_asset_meter'
}

export type TriggerRollOptionActionChoice =
	| TriggerRollOptionActionChoiceStat
	| TriggerRollOptionActionChoiceRef
	| TriggerRollOptionActionChoiceAttachedAssetRef
	| TriggerRollOptionActionChoiceCustomValue

export type TriggerExtension<T extends MoveRollType> = Omit<
	Types.Moves.Trigger<T>,
	'text'
> & {
	roll_options: Exclude<Types.Moves.Trigger<T>['roll_options'], undefined>
}

export interface TriggerRollOptionActionChoiceAttachedAssetRef
	extends TriggerRollOptionChoiceBase {
	using: 'attached_asset_meter'
}

export interface TriggerRollOptionActionChoiceRef
	extends TriggerRollOptionChoiceBase {
	using: 'ref'
	ref: string // TODO: asset control ID wildcard
}

export interface TriggerRollOptionActionChoiceStat
	extends TriggerRollOptionChoiceBase {
	using: Types.Players.PlayerStatLike
}

export interface TriggerRollOptionActionChoiceCustomValue
	extends TriggerRollOptionChoiceBase {
	using: 'custom_value'
	label: Types.Localize.Label
	value: number
}

export interface TriggerRollOptionProgressChoice
	extends TriggerRollOptionChoiceBase {
	using: ProgressType
}

export interface TriggerRollOption<T extends MoveRollType = MoveRollType> {
	text?: Types.Localize.MarkdownString
	method: MoveRollMethod | null
	by?: TriggerBy
	choices?: this['method'] extends undefined | null
		? undefined
		: Array<TriggerRollOptionChoice<T>>
}
