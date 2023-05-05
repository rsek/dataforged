import { type Static, Type } from '@sinclair/typebox'
import { Abstract, Localize } from 'schema/common'

export const RegionEntry = Type.Intersect(
	[
		Abstract.Cyclopedia,
		Type.Object({ quest_starter: Type.Ref(Localize.MarkdownString) })
	],
	{
		$id: '#/$defs/RegionEntry',
		description:
			'A region entry, like those used to describe the Ironlands in classic Ironsworn.'
	}
)

export type RegionEntry = Static<typeof RegionEntry>
