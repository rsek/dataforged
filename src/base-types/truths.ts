import { type Abstract, type Localize, type Metadata } from '@base-types'

export type TruthID = string

interface TruthBase extends Abstract.SourcedNode<TruthID> {
	id: TruthID
	name: string
	options: TruthOptionBase[]
	icon?: Metadata.SvgImageUrl
}

export interface SettingTruth extends TruthBase {
	options: SettingTruthOption[]
}

export interface WorldTruth extends TruthBase {}

export type TruthOptionID = string
export interface TruthOptionBase {
	id: TruthOptionID
	description: Localize.MarkdownString | Localize.MarkdownString
	quest_starter: Localize.MarkdownString
}

export interface WorldTruthOption extends TruthOptionBase {}

export interface SettingTruthOption extends TruthOptionBase {
	summary: Localize.MarkdownString
	description: Localize.MarkdownString
}
