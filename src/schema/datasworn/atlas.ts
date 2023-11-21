import { Type, type Static } from '@sinclair/typebox'
import { AtlasID } from './common/id.js'
import { Generic, ID } from './common/index.js'

export const AtlasEntry = Generic.Cyclopedia(
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

const AtlasBase = Generic.Collection(Type.Ref(AtlasEntry), Type.Ref(AtlasID))

export const Atlas = Generic.RecursiveCollection(AtlasBase, {
	$id: '#/$defs/Atlas',
	releaseStage: 'experimental'
})

export type Atlas = Generic.RecursiveCollection<Generic.Collection<AtlasEntry>>
export type TAtlas = typeof Atlas
