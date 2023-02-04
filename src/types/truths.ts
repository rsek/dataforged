import { type Localized, type Metadata } from 'src/types'
import { type Node } from 'src/types/abstract'

export type ID = string

interface SettingTruth extends Node<ID> {
  _id: ID
  icon: Metadata.Icon
  options: TruthOption[]
}

export interface TruthStarforged extends SettingTruth {
  options: TruthOptionStarforged[]
}

export interface TruthClassic extends SettingTruth {}

export type TruthOptionID = string
export interface TruthOption {
  _id: TruthOptionID
  description: Localized.MarkdownParagraphs | Localized.MarkdownParagraph
  quest_starter: Localized.MarkdownParagraph
}

export interface TruthOptionStarforged extends TruthOption {
  summary: Localized.MarkdownSentences
  description: Localized.MarkdownParagraphs
}
