import { Type, type Static } from '@sinclair/typebox'
import { Truths, ID, Localize } from 'base-types/common'

export const SettingTruthOption = Type.Composite(
	[
		Truths.TruthOptionBase,
		Type.Object({
			id: Type.Ref(ID.SettingTruthOptionID),
			summary: Type.Ref(Localize.MarkdownString),
			description: Type.Ref(Localize.MarkdownString)
		})
	],
	{ $id: '#/$defs/SettingTruthOption' }
)

export type SettingTruthOption = Static<typeof SettingTruthOption>

export const SettingTruth = Type.Composite(
	[
		Truths.TruthBase,
		Type.Object({
			id: Type.Ref(ID.SettingTruthID),
			options: Type.Array(Type.Ref(SettingTruthOption))
		})
	],
	{
		$id: '#/$defs/SettingTruth',
		description: 'A setting truth category in the format used by Starforged.'
	}
)

export type SettingTruth = Static<typeof SettingTruth>
