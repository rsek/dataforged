import { Type, type Static } from '@sinclair/typebox'
import { AtlasID } from './common/Id.js'
import { Generic, ID } from './common/index.js'

export const AtlasEntry = Generic.RecursiveCollectable(
	Type.Ref(ID.AtlasEntryID),
	Generic.Cyclopedia(Type.Object({})),
	{
		$id: '#/$defs/AtlasEntry',
		title: 'Atlas entry',
		description:
			'An atlas entry, like the Ironlands region entries found in classic Ironsworn.'
	}
)
export type TAtlasEntry = typeof AtlasEntry
export type AtlasEntry = Static<typeof AtlasEntry>

export const Atlas = Generic.RecursiveCollection(
	Generic.Collection(Type.Ref(AtlasEntry), Type.Ref(AtlasID)),
	{
		$id: '#/$defs/Atlas',
		releaseStage: 'experimental'
	}
)

export type TAtlas = typeof Atlas
export type Atlas = Static<typeof Atlas>
