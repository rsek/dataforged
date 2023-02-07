import { type Node } from '@df-types/abstract'
import {
  type ConditionMeterAliasClassic,
  type ConditionMeterAliasStarforged
} from '@df-types/assets'
import {
  type ProgressTypeClassic,
  type ProgressTypeStarforged
} from '@df-types/progress'
import type * as Localized from '@df-types/localize'
import type * as Metadata from '@df-types/metadata'
import type * as Player from '@df-types/players'

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

interface TriggerBase<OptionType extends TriggerOptionBase<any>> {
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

interface TriggerOptionBase<UsingType extends string> {
  text: Localized.MarkdownPhrase
  method: RollMethod
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
  extends TriggerOptionBase<RollableStatStarforgedID> {}

export interface TriggerOptionActionClassic
  extends TriggerOptionBase<RollableStatClassicID> {}

export interface TriggerOptionProgressStarforged
  extends TriggerOptionBase<ProgressTypeStarforged> {}

export interface TriggerOptionProgressClassic
  extends TriggerOptionBase<ProgressTypeClassic> {}

export type TriggerOptionStarforged =
  | TriggerOptionActionStarforged
  | TriggerOptionProgressStarforged

export type TriggerOptionClassic =
  | TriggerOptionActionClassic
  | TriggerOptionProgressClassic

export type TriggerOption = TriggerOptionStarforged | TriggerOptionClassic
