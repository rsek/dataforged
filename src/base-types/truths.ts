import { type Localize, type Metadata } from '@base-types'
import { type Node } from '@base-types/abstract'

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
	description: Localize.MarkdownParagraphs | Localize.MarkdownParagraph
	quest_starter: Localize.MarkdownParagraph
}

export interface TruthOptionStarforged extends TruthOption {
	summary: Localize.MarkdownSentences
	description: Localize.MarkdownParagraphs
}
