import { type Static, Type } from '@sinclair/typebox'
import { Abstract, Localize } from 'schema/common'
import { RegionEntryID } from 'schema/common/id'
import { Source } from 'schema/common/metadata'

export const RegionEntry = Abstract.Cyclopedia(
	{
		id: Type.Ref(RegionEntryID),
		source: Type.Ref(Source),
		quest_starter: Type.Ref(Localize.MarkdownString)
	},
	{
		$id: '#/$defs/RegionEntry',
		title: 'Region entry',
		description:
			'A region entry, like the Ironlands region entries found in classic Ironsworn.'
	}
)

export type RegionEntry = Static<typeof RegionEntry>
