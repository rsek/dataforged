import type * as Types from '@base-types'import { StatID } from 'base-types/players'
=

export type MoveID = string

export type RollType = 'action_roll' | 'progress_roll'

export type MoveCategoryID = string
export interface MoveCategory
	extends Types.Abstract.Collection<Move<RollType>, MoveCategoryID> {}

export interface Move<T extends RollType = RollType>
	extends Types.Abstract.SourcedNode<MoveID> {
	name: Types.Localize.Label
	text: Types.Localize.MarkdownParagraphs
	outcomes: MoveOutcomes
	trigger: Trigger<T>
}

export interface MoveExtension extends Types.Abstract.ExtendMany<Move> {}

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

export interface Trigger<T extends RollType|null = RollType|null> {
	text: Types.Localize.MarkdownPhrase
  roll_type?: T | null
	options?: T extends RollType ? Array<TriggerOption<T>> : null
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
export type RollMethod = 'any' | 'all' | 'highest' | 'lowest'

export type ProgressType =
	| Types.RulesetStarforged.ProgressType
	| Types.RulesetClassic.ProgressType

export type RollableStatID =
	| Types.Players.StatID
	| Types.Players.ConditionMeterID
	| Types.RulesetStarforged.ConditionMeterAlias
	| Types.RulesetClassic.ConditionMeterAlias

export type TriggerChoice<T extends RollType = RollType> = T extends 'progress_roll'
	? T extends 'action_roll'
		? // if it's a union, allow both types:
		  TriggerChoiceProgress | TriggerChoiceStat|TriggerChoiceCustomValue
		: // otherwise, restrict types as appropriate:
		  TriggerChoiceProgress
	: TriggerChoiceStat|TriggerChoiceCustomValue

export interface TriggerChoiceBase {
  using?: 'progress' | 'stat' | 'custom'
  label?: Types.Localize.Label
  value?: number
  ref?: string | null
}


export interface TriggerChoiceStat extends TriggerChoiceBase {
  using?: 'stat'
  ref: RollableStatID
}

export interface TriggerChoiceProgress extends TriggerChoiceBase {
  using?: 'progress'
  ref: ProgressType
}

export interface TriggerChoiceCustomValue extends TriggerChoiceBase {
  using?: 'custom'
  ref?: null
  label: Types.Localize.Label
  value: number
}

export type TriggerChoiceAction = TriggerChoiceStat | TriggerChoiceCustomValue

export interface TriggerOption<T extends RollType = RollType> {
	text?: Types.Localize.MarkdownPhrase
	method?: RollMethod | MoveOutcomeType
	by?: TriggerBy
	choices?: this['method'] extends undefined ? undefined : Array<TriggerChoice<T>>
}