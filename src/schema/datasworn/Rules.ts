import { type Static, Type } from '@sinclair/typebox'
import { Localize, Generic, ID } from './common/index.js'
import * as Inputs from './common/Inputs.js'
import { Flatten } from './utils/generic.js'

export const StatRule = Type.Object(
	{
		name: Type.Ref(Localize.Label),
		description: Type.Ref(Localize.MarkdownString)
	},
	{ $id: '#/$defs/StatRule' }
)
export type StatRule = Static<typeof StatRule>

export const ConditionMeterRule = Flatten(
	[
		Type.Object({
			description: Type.Ref(Localize.MarkdownString),
			shared: Type.Boolean({ default: false })
		}),
		Type.Omit(
			Inputs.Meter(Type.Integer({ default: 0 }), Type.Integer({ default: 5 })),
			['value']
		)
	],
	{ $id: '#/$defs/ConditionMeterRule' }
)

export type ConditionMeterRule = Static<typeof ConditionMeterRule>

export const ImpactRule = Type.Object(
	{
		name: Type.Ref(Localize.Label),
		description: Type.Ref(Localize.MarkdownString),
		shared: Type.Boolean({ default: false }),
		prevents_recovery: Type.Array(Type.Ref(ID.DictKey), { default: [] }),
		permanent: Type.Boolean({ default: false })
	},
	{ $id: '#/$defs/ImpactRule' }
)
export type Impact = Static<typeof ImpactRule>

export const ImpactCategory = Type.Object(
	{
		name: Type.Ref(Localize.Label),
		description: Type.Ref(Localize.MarkdownString),
		contents: Generic.Dictionary(Type.Ref(ImpactRule))
	},
	{
		$id: '#/$defs/ImpactCategory'
	}
)
export type ImpactCategory = Static<typeof ImpactCategory>

export const SpecialTrackRule = Type.Object(
	{
		name: Type.Ref(Localize.Label),
		description: Type.Ref(Localize.MarkdownString),
		shared: Type.Boolean({ default: false }),
		optional: Type.Boolean({ default: false })
	},
	{ $id: '#/$defs/SpecialTrackRule' }
)
export type SpecialTrackRule = Static<typeof SpecialTrackRule>

export const Rules = Type.Object(
	{
		stats: Generic.Dictionary(Type.Ref(StatRule, { default: undefined })),
		condition_meters: Generic.Dictionary(
			Type.Ref(ConditionMeterRule, { default: undefined })
		),
		impacts: Generic.Dictionary(
			Type.Ref(ImpactCategory, { default: undefined })
		),
		special_tracks: Generic.Dictionary(
			Type.Ref(SpecialTrackRule, { default: undefined })
		)
	},
	{ $id: '#/$defs/Rules' }
)
export type Rules = Static<typeof Rules>
export type TRules = typeof Rules