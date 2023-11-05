import { Type, type Static } from '@sinclair/typebox'
import { ID, Abstract } from './common/index.js'
import { Source } from './common/metadata.js'

export const AtlasEntry = Abstract.Cyclopedia(
	{
		id: Type.Ref(ID.AtlasEntryID),
		source: Type.Ref(Source)
	},
	{
		$id: '#/$defs/AtlasEntry',
		title: 'Atlas entry',
		description:
			'An atlas entry, like the Ironlands region entries found in classic Ironsworn.',
		releaseStage: 'experimental'
	}
)

export type AtlasEntry = Static<typeof AtlasEntry>

export const Atlas = Abstract.RecursiveCollection(
	Type.Ref(AtlasEntry),
	Type.Ref(ID.AtlasID),
	'#/$defs/Atlas',
	{},
	{ releaseStage: 'experimental' }
)

export type Atlas = Static<typeof Atlas>
