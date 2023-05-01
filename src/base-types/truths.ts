import { Abstract } from '@base-types'
import { type Static, Type } from '@sinclair/typebox'
import { Label, MarkdownString } from 'base-types/localize'
import { SvgImageURL } from 'base-types/metadata'

export const TruthID = Type.String()
export type TruthID = Static<typeof TruthID>

export const TruthOptionID = Type.String()
export type TruthOptionID = Static<typeof TruthOptionID>

const TruthOptionBase = Type.Object({
	id: TruthOptionID,
	description: MarkdownString,
	quest_starter: MarkdownString
})

const TruthBase = Type.Composite([
	Abstract.SourcedNode,
	Type.Object({
		id: TruthID,
		name: Label,
		options: Type.Array(TruthOptionBase),
		icon: Type.Optional(SvgImageURL)
	})
])

export const SettingTruthOption = Type.Composite([
	TruthOptionBase,
	Type.Object({
		summary: MarkdownString,
		description: MarkdownString
	})
])

export type SettingTruthOption = Static<typeof SettingTruthOption>

export const SettingTruth = Type.Composite([
	TruthBase,
	Type.Object({ options: Type.Array(SettingTruthOption) })
])

export type SettingTruth = Static<typeof SettingTruth>

export const WorldTruth = TruthBase
export type WorldTruth = Static<typeof WorldTruth>
export const WorldTruthOption = TruthOptionBase
export type WorldTruthOption = Static<typeof WorldTruthOption>
