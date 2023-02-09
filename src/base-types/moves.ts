import { type Node } from '@base-types/abstract'
import {
	type ConditionMeterAliasClassic,
	type ConditionMeterAliasStarforged
} from '@base-types/assets'
import {
	type ProgressTypeClassic,
	type ProgressTypeStarforged
} from '@base-types/progress'
import type * as Localized from '@base-types/localize'
import type * as Metadata from '@base-types/metadata'
import type * as Player from '@base-types/players'

export type MoveID = string

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface MoveBase extends Node<MoveID> {
	name: Localized.Label
	source: Metadata.Source
	text: Localized.MarkdownParagraphs
	outcomes: MoveOutcomes
	trigger: Trigger
}
export interface MoveStarforged extends MoveBase {
	trigger: TriggerStarforged
}
export interface MoveClassic extends MoveBase {
	trigger: TriggerClassic
}

export type Move = MoveStarforged | MoveClassic

export type MoveOutcomeType = 'miss' | 'weak_hit' | 'strong_hit'

export interface MoveOutcome {
	text: Localized.MarkdownParagraph
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

export interface TriggerBase<OptionType extends TriggerOptionBase<any>> {
	text: Localized.MarkdownPhrase
	options?: OptionType[]
}

export interface TriggerStarforged
	extends TriggerBase<TriggerOptionStarforged> {}

export interface TriggerClassic extends TriggerBase<TriggerOptionClassic> {}

export type Trigger = TriggerClassic | TriggerStarforged

export type RollMethod =
	| 'any'
	| 'all'
	| 'highest'
	| 'lowest'
	| 'inherit'
	| MoveOutcomeType

export type RollType = 'action_roll' | 'progress_roll'

export interface TriggerOptionBase<UsingType extends string> {
	text?: Localized.MarkdownPhrase
	method?: RollMethod
	roll_type: RollType
	using: UsingType[]
}

export type RollableStatIDCommon = Player.StatID | Player.ConditionMeterID

export type RollableStatStarforgedID =
	| RollableStatIDCommon
	| ConditionMeterAliasStarforged

export type RollableStatClassicID =
	| RollableStatIDCommon
	| ConditionMeterAliasClassic

export interface TriggerOptionActionStarforged
	extends TriggerOptionBase<RollableStatStarforgedID> {
	roll_type: 'action_roll'
}

export interface TriggerOptionActionClassic
	extends TriggerOptionBase<RollableStatClassicID> {
	roll_type: 'action_roll'
}

export interface TriggerOptionProgressStarforged
	extends TriggerOptionBase<ProgressTypeStarforged> {
	roll_type: 'progress_roll'
}

export interface TriggerOptionProgressClassic
	extends TriggerOptionBase<ProgressTypeClassic> {
	roll_type: 'progress_roll'
}

export type TriggerOptionStarforged =
	| TriggerOptionActionStarforged
	| TriggerOptionProgressStarforged

export type TriggerOptionClassic =
	| TriggerOptionActionClassic
	| TriggerOptionProgressClassic

export type TriggerOption = TriggerOptionStarforged | TriggerOptionClassic
