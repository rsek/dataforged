import type * as In from 'types/input/classic'
import type * as Out from 'types/output/classic'
import {
	recursiveCollectionTransformer,
	sourcedTransformer
} from './transformer'

export const AtlasEntry = sourcedTransformer<In.AtlasEntry, Out.AtlasEntry>({})

export const Atlas = recursiveCollectionTransformer<
	In.Atlas,
	Out.Atlas,
	typeof AtlasEntry
>('atlas', AtlasEntry, {})
