import { type Node } from 'src/types/abstract'
import {
  type ProgressTypeClassic,
  type ProgressTypeStarforged
} from 'src/types/progress'
import type * as Localized from './localized'
import type * as Metadata from './metadata'
import type * as Player from './players'

export type ID = string
export default interface Move extends Node<ID> {
  name: Localized.Label
  source: Metadata.Source
  text: Localized.MarkdownParagraphs
  outcomes: Outcomes
}

export type OutcomeType = 'miss' | 'weak_hit' | 'strong_hit'

export interface Outcome {
  text: Localized.MarkdownParagraph
}

// TODO: would match outcomes make sense as ExtendOne?
export interface OutcomeMatchable extends Outcome {
  match?: Outcome
}
export interface Outcomes extends Record<OutcomeType, Outcome> {
  miss: OutcomeMatchable
  weak_hit: Outcome
  strong_hit: OutcomeMatchable
}

export interface Trigger {
  text: Localized.MarkdownPhrase
  options?: TriggerOption[]
}

export type RollMethod =
  | 'any'
  | 'all'
  | 'highest'
  | 'lowest'
  | 'inherit'
  | OutcomeType

interface TriggerOptionBase {
  text: Localized.MarkdownPhrase
  method: RollMethod
}

export type RollableStatID = Player.StatID | Player.ConditionMeterID

export interface TriggerOptionAction extends TriggerOptionBase {
  using: RollableStatID[]
}
export interface TriggerOptionProgress extends TriggerOptionBase {
  using: Array<ProgressTypeClassic | ProgressTypeStarforged>
}

export type TriggerOption = TriggerOptionAction | TriggerOptionProgress
