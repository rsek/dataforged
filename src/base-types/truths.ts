import { type Abstract, type Localize, type Metadata } from '@base-types'

export type TruthID = string

interface TruthBase extends Abstract.SourcedNode<TruthID> {
	id: TruthID
	name: string
	choices: TruthOptionBase[]
	icon?: Metadata.Icon
}

export interface SettingTruth extends TruthBase {
	choices: SettingTruthOption[]
}

export interface WorldTruth extends TruthBase {}

export type TruthOptionID = string
export interface TruthOptionBase {
	id: TruthOptionID
	description: Localize.MarkdownParagraphs | Localize.MarkdownParagraph
	quest_starter: Localize.MarkdownParagraph
}

export interface WorldTruthOption extends TruthOptionBase {}

export interface SettingTruthOption extends TruthOptionBase {
	summary: Localize.MarkdownSentences
	description: Localize.MarkdownParagraphs
}
