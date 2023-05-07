import { type Static, Type } from '@sinclair/typebox'
import { Abstract, Localize } from 'schema/common'

export const RegionEntry = Abstract.Cyclopedia(
	{ quest_starter: Type.Ref(Localize.MarkdownString) },
	{
		$id: '#/$defs/RegionEntry',
		title: 'Region entry',
		description:
			'A region entry, like the Ironlands region entries found in classic Ironsworn.'
	}
)

export type RegionEntry = Static<typeof RegionEntry>
