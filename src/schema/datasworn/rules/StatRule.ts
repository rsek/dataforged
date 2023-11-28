import { type Static, Type } from '@sinclair/typebox'
import { Localize } from '../common/index.js'

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
