import type * as Types from '@base-types'

export type MoveID = string

export type RollType = 'action_roll' | 'progress_roll'

export type MoveCategoryID = string
export interface MoveCategory
	extends Types.Abstract.Collection<Move<RollType>, MoveCategoryID> {
	summary: string
	color: string
}

export interface Move<T extends RollType = RollType>
	extends Types.Abstract.SourcedNode<MoveID> {
	name: Types.Localize.Label
	text: Types.Localize.MarkdownParagraphs
	outcomes: MoveOutcomes
	trigger: Trigger<T>
}

export interface MoveExtension extends Types.Abstract.ExtendMany<Move> {
	trigger:
		| Types.Moves.TriggerExtension<Types.Moves.Trigger<'action_roll'>>
		| Types.Moves.TriggerExtension<Types.Moves.Trigger<'progress_roll'>>
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

export interface Trigger<T extends RollType = RollType> {
	text: Types.Localize.MarkdownPhrase
	roll_type: T
	options?: Array<TriggerOption<T>>
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
	| Types.Players.StatID
	| Types.Players.ConditionMeterID
	| Types.RulesetStarforged.ConditionMeterAlias
	| Types.RulesetClassic.ConditionMeterAlias

export type TriggerOptionChoice<T extends RollType = RollType> =
	T extends 'progress_roll'
		? T extends 'action_roll'
			? // if it's a union, allow both types:
			  | TriggerOptionProgressChoice
					| TriggerOptionActionChoiceStat
					| TriggerOptionActionChoiceCustom
			: // otherwise, restrict types as appropriate:
			  TriggerOptionProgressChoice
		: TriggerOptionActionChoiceStat | TriggerOptionActionChoiceCustom

export interface TriggerChoiceBase {
	using: ProgressType | 'stat' | 'custom'
	label?: Types.Localize.Label
	value?: number
	ref?: string | null
}

export type TriggerExtension<T extends Types.Moves.Trigger> = Omit<
	T,
	'text'
> & {
	options: Exclude<T['options'], undefined>
}

export interface TriggerOptionActionChoiceStat
	extends Omit<TriggerChoiceBase, 'value' | 'label'> {
	using: 'stat'
	ref: string // RollableStatID
}

export interface TriggerOptionProgressChoice
	extends Omit<TriggerChoiceBase, 'label' | 'value' | 'ref'> {
	using: ProgressType
}

export interface TriggerOptionActionChoiceCustom
	extends Omit<TriggerChoiceBase, 'ref'> {
	using: 'custom'
	label: Types.Localize.Label
	value: number
}

export type TriggerOptionActionChoice =
	| TriggerOptionActionChoiceStat
	| TriggerOptionActionChoiceCustom

export interface TriggerOption<T extends RollType = RollType> {
	text?: Types.Localize.MarkdownPhrase
	method: MoveRollMethod | null
	by?: TriggerBy
	choices?: this['method'] extends undefined
		? undefined
		: Array<TriggerOptionChoice<T>>
}
