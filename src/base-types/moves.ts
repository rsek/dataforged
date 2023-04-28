import type * as Types from '@base-types'

export type MoveID = string

export type MoveRollType = 'action_roll' | 'progress_roll'

export type MoveCategoryID = string
export interface MoveCategory
	extends Types.Abstract.Collection<Move<MoveRollType>, MoveCategoryID> {
	summary: string
	color: string
}

export interface Move<T extends MoveRollType = MoveRollType>
	extends Types.Abstract.SourcedNode<MoveID> {
	name: Types.Localize.Label
	text: Types.Localize.MarkdownParagraphs
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
	text: Types.Localize.MarkdownParagraph
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
	text: Types.Localize.MarkdownPhrase
	roll_type: T
	roll_options?: Array<TriggerRollOption<T>>
}

export interface MoveReroll {
	text?: Types.Localize.MarkdownPhrase
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
	| Types.RulesetStarforged.ConditionMeterAlias
	| Types.RulesetClassic.ConditionMeterAlias

export type TriggerRollOptionChoice<T extends MoveRollType = MoveRollType> =
	T extends 'progress_roll'
		? T extends 'action_roll'
			? // if it's a union, allow both types:
			  | TriggerRollOptionProgressChoice
					| TriggerRollOptionActionChoiceStat
					| TriggerRollOptionActionChoiceCustomValue
			: // otherwise, restrict types as appropriate:
			  TriggerRollOptionProgressChoice
		:
				| TriggerRollOptionActionChoiceStat
				| TriggerRollOptionActionChoiceCustomValue

export interface TriggerRollOptionChoiceBase {
	using: ProgressType | Types.Players.PlayerStatLike | 'custom_value' | 'ref'
	label?: Types.Localize.Label
	value?: number
	ref?: string | null
}

export type TriggerExtension<T extends MoveRollType> = Omit<
	Types.Moves.Trigger<T>,
	'text'
> & {
	roll_options: Exclude<Types.Moves.Trigger<T>['roll_options'], undefined>
}

export interface TriggerRollOptionActionChoiceRef
	extends Omit<TriggerRollOptionChoiceBase, 'value' | 'label'> {
	using: 'ref'
	// label: Types.Localize.Label
	ref: string
}

export interface TriggerRollOptionActionChoiceStat
	extends Omit<TriggerRollOptionChoiceBase, 'label' | 'ref' | 'value'> {
	using: Types.Players.PlayerStatLike
}

export interface TriggerRollOptionProgressChoice
	extends Omit<TriggerRollOptionChoiceBase, 'label' | 'value' | 'ref'> {
	using: ProgressType
}

export interface TriggerRollOptionActionChoiceCustomValue
	extends Omit<TriggerRollOptionChoiceBase, 'ref'> {
	using: 'custom_value'
	label: Types.Localize.Label
	value: number
}

export type TriggerRollOptionActionChoice =
	| TriggerRollOptionActionChoiceStat
	| TriggerRollOptionActionChoiceCustomValue
	| TriggerRollOptionActionChoiceRef

export interface TriggerRollOption<T extends MoveRollType = MoveRollType> {
	text?: Types.Localize.MarkdownPhrase
	method: MoveRollMethod | null
	by?: TriggerBy
	choices?: this['method'] extends undefined
		? undefined
		: Array<TriggerRollOptionChoice<T>>
}
