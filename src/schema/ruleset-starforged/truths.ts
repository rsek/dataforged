import { Type, type Static } from '@sinclair/typebox'
import { Truths, ID, Localize } from 'schema/common'
import { Squash } from 'schema/common/utils'

export const SettingTruthOption = Squash(
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

export const SettingTruth = Squash(
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
