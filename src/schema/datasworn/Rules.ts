import { type Static, Type } from '@sinclair/typebox'
import { Localize, Id } from './common/index.js'
import * as Inputs from './common/Inputs.js'
import * as Utils from './Utils.js'
import * as Generic from './Generic.js'

export const StatRule = Type.Object(
	{
		label: Type.Ref(Localize.Label, {
			description: 'A label for this stat.',
			examples: ['edge']
		}),
		description: Type.Ref(Localize.MarkdownString, {
			description: 'A description of this stat.',
			examples: ['Quickness, agility, and prowess when fighting at a distance.']
		})
	},
	{
		$id: '#/$defs/StatRule',
		description: 'Describes a standard player character stat.'
	}
)
export type StatRule = Static<typeof StatRule>

export const ConditionMeterRule = Utils.Assign(
	[
		Type.Object({
			description: Type.Ref(Localize.MarkdownString, {
				description: 'A description of this condition meter.'
			}),
			shared: Type.Boolean({
				default: false,
				description: 'Is this condition meter shared by all players?'
			})
		}),
		Inputs.Meter(Type.Integer({ default: 0 }), Type.Integer({ default: 5 }))
	],
	{
		$id: '#/$defs/ConditionMeterRule',
		description: 'Describes a standard player character condition meter.'
	}
)

export type ConditionMeterRule = Static<typeof ConditionMeterRule>

export const ImpactRule = Type.Object(
	{
		label: Type.Ref(Localize.Label, {
			description: 'The label for this impact.'
		}),
		description: Type.Ref(Localize.MarkdownString, {
			description: 'A description of this impact.'
		}),
		shared: Type.Boolean({
			default: false,
			description: 'Is this impact applied to all players at once?'
		}),
		prevents_recovery: Type.Array(Type.Ref(Id.DictKey), {
			default: [],
			description:
				'Keys of ruleset condition meters, to which this impact prevents recovery.'
		}),
		permanent: Type.Boolean({
			default: false,
			description: 'Is this impact permanent?'
		})
	},
	{
		$id: '#/$defs/ImpactRule',
		description: 'Describes a standard impact/debility.'
	}
)
export type Impact = Static<typeof ImpactRule>

export const ImpactCategory = Type.Object(
	{
		label: Type.Ref(Localize.Label, {
			description: 'A label for this impact category.'
		}),
		description: Type.Ref(Localize.MarkdownString, {
			description: 'A description of this impact category.'
		}),
		contents: Generic.Dictionary(Type.Ref(ImpactRule), {
			description: 'A dictionary object of the Impacts in this category.'
		})
	},
	{
		$id: '#/$defs/ImpactCategory',
		description: 'Describes a category of standard impacts/debilities.'
	}
)
export type ImpactCategory = Static<typeof ImpactCategory>

export const SpecialTrackRule = Type.Object(
	{
		label: Type.Ref(Localize.Label, {
			description: 'A label for this special track.'
		}),
		description: Type.Ref(Localize.MarkdownString, {
			description: 'A description of this special track.'
		}),
		shared: Type.Boolean({
			default: false,
			description: 'Is this track shared by all players?'
		}),
		optional: Type.Boolean({
			default: false,
			description: 'Is this track an optional rule?'
		})
	},
	{
		$id: '#/$defs/SpecialTrackRule',
		description:
			'Describes a special track like Bonds (classic Ironsworn), Failure (Delve), or Legacies (Starforged).'
	}
)
export type SpecialTrackRule = Static<typeof SpecialTrackRule>

export const Rules = Type.Object(
	{
		stats: Generic.Dictionary(Type.Ref(StatRule, { default: undefined }), {
			description:
				'Describes the standard stats used by player characters in this ruleset.'
		}),
		condition_meters: Generic.Dictionary(
			Type.Ref(ConditionMeterRule, { default: undefined }),
			{
				description:
					'Describes the standard condition meters used by player characters in this ruleset.'
			}
		),
		impacts: Generic.Dictionary(
			Type.Ref(ImpactCategory, { default: undefined }),
			{
				description:
					'Describes the standard impacts/debilities used by player characters in this ruleset.'
			}
		),
		special_tracks: Generic.Dictionary(
			Type.Ref(SpecialTrackRule, { default: undefined }),
			{
				description:
					'Describes the special tracks used by player characters in this ruleset, like Bonds (classic Ironsworn), Failure (Delve), or Legacies (Starforged).'
			}
		)
	},
	{
		$id: '#/$defs/Rules',
		description:
			'Describes rules for player characters in this ruleset, such as stats and condition meters.'
	}
)
export type Rules = Static<typeof Rules>
export type TRules = typeof Rules