import { type Static, Type } from '@sinclair/typebox'
import { Localize } from '../common/index.js'

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
		$id: 'SpecialTrackRule',
		description:
			'Describes a special track like Bonds (classic Ironsworn), Failure (Delve), or Legacies (Starforged).'
	}
)
export type SpecialTrackRule = Static<typeof SpecialTrackRule>
