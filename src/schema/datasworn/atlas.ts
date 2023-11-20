import { Type, type Static } from '@sinclair/typebox'
import { ID, Abstract } from './common/index.js'
import { AtlasID } from './common/id.js'

export const AtlasEntry = Abstract.Cyclopedia(
	Type.Object({
		id: Type.Ref(ID.AtlasEntryID)
	}),
	{
		$id: '#/$defs/AtlasEntry',
		title: 'Atlas entry',
		description:
			'An atlas entry, like the Ironlands region entries found in classic Ironsworn.',
		releaseStage: 'experimental'
	}
)
export type TAtlasEntry = typeof AtlasEntry
export type AtlasEntry = Static<typeof AtlasEntry>

const AtlasBase = Abstract.Collection(Type.Ref(AtlasEntry), Type.Ref(AtlasID))

export const Atlas = Abstract.RecursiveCollection(AtlasBase, {
	$id: '#/$defs/Atlas',
	releaseStage: 'experimental'
})

export type Atlas = Abstract.RecursiveCollection<
	Abstract.Collection<AtlasEntry>
>
export type TAtlas = typeof Atlas
