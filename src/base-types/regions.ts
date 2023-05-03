import { type Static, Type } from '@sinclair/typebox'
import { Cyclopedia } from 'base-types/abstract'
import { MarkdownString } from 'base-types/localize'

export const RegionEntry = Type.Intersect(
	[Cyclopedia, Type.Object({ quest_starter: MarkdownString })],
	{
		$id: 'RegionEntry',
		description:
			'A region entry, like those used to describe the Ironlands in classic Ironsworn.'
	}
)

export type RegionEntry = Static<typeof RegionEntry>
