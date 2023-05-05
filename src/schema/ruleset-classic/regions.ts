import { type Static, Type } from '@sinclair/typebox'
import { Abstract, Localize } from 'schema/common'
import { Squash } from 'schema/common/utils'

export const RegionEntry = Squash(
	[
		Abstract.Cyclopedia,
		Type.Object({ quest_starter: Type.Ref(Localize.MarkdownString) })
	],
	{
		$id: '#/$defs/RegionEntry',
		description:
			'A region entry, like the Ironlands region entries found in classic Ironsworn.'
	}
)

export type RegionEntry = Static<typeof RegionEntry>
