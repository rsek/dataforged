import { type Static, Type } from '@sinclair/typebox'
import { Localize, Id } from '../common/index.js'
import * as Generic from '../Generic.js'

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
export type ImpactRule = Static<typeof ImpactRule>

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
