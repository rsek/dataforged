import { Common } from '@base-types'
import { type Static, Type } from '@sinclair/typebox'
import {
	SettingTruthID,
	SettingTruthOptionID,
	WorldTruthID,
	WorldTruthOptionID
} from 'base-types/id'
import { Label, MarkdownString } from 'base-types/localize'
import { SvgImageURL } from 'base-types/metadata'

const TruthOptionBase = Type.Object({
	description: MarkdownString,
	quest_starter: MarkdownString
})

const TruthBase = Type.Composite([
	Common.SourcedNode,
	Type.Object({
		name: Type.Ref(Label),
		options: Type.Array(TruthOptionBase),
		icon: Type.Optional(SvgImageURL)
	})
])

export const SettingTruthOption = Type.Composite(
	[
		TruthOptionBase,
		Type.Object({
			id: Type.Ref(SettingTruthOptionID),
			summary: MarkdownString,
			description: MarkdownString
		})
	],
	{ $id: '#/$defs/SettingTruthOption' }
)

export type SettingTruthOption = Static<typeof SettingTruthOption>

export const SettingTruth = Type.Composite(
	[
		TruthBase,
		Type.Object({
			id: Type.Ref(SettingTruthID),
			options: Type.Array(SettingTruthOption)
		})
	],
	{
		$id: '#/$defs/SettingTruth',
		description: 'A setting truth category in the format used by Starforged.'
	}
)

export type SettingTruth = Static<typeof SettingTruth>

export const WorldTruth = Type.Composite(
	[TruthBase, Type.Object({ id: WorldTruthID })],
	{
		$id: '#/$defs/WorldTruth',
		description: 'A world truth category in the format used by Ironsworn.'
	}
)
export type WorldTruth = Static<typeof WorldTruth>

export const WorldTruthOption = Type.Composite(
	[TruthOptionBase, Type.Object({ id: WorldTruthOptionID })],
	{ $id: '#/$defs/WorldTruthOption' }
)

export type WorldTruthOption = Static<typeof WorldTruthOption>
