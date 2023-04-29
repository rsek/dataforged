import type * as Types from '@base-types'

export type MoveID = string
export type MoveIDWildcard = string

export type MoveRollType = 'action_roll' | 'progress_roll' | 'no_roll'

export type MoveCategoryID = string
export interface MoveCategory
	extends Types.Abstract.Collection<Move<MoveRollType>, MoveCategoryID> {
	summary: string
	color: string
}

export interface Move<T extends MoveRollType = MoveRollType>
	extends Types.Abstract.SourcedNode<MoveID> {
	name: Types.Localize.Label
	oracles?: Types.Oracles.OracleTableID[]
	text: Types.Localize.MarkdownString
	outcomes: MoveOutcomes
	trigger: Trigger<T>
}

export interface MoveExtension extends Types.Abstract.ExtendMany<Move> {
	extends: MoveID[] | null
	trigger:
		| Types.Moves.TriggerExtension<'action_roll'>
		| Types.Moves.TriggerExtension<'progress_roll'>
}

export type MoveOutcomeType = 'miss' | 'weak_hit' | 'strong_hit'

export interface MoveOutcome {
	text: Types.Localize.MarkdownString
	count_as?: MoveOutcomeType
	reroll?: MoveReroll
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

export interface MoveReroll {
	text?: Types.Localize.MarkdownString
	method: MoveRerollMethod
}

export interface TriggerBy {
	player: boolean
	ally: boolean
}

export type MoveRerollMethod =
	| 'any'
	| 'all'
	| 'challenge_die'
	| 'challenge_dice'
	| 'action_die'
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
		| 'attached_asset_ref'
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
	using: 'attached_asset_ref'
	ref: string // TODO: asset control ID wildcard
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
