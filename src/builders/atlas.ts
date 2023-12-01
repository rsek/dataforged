import type * as In from '../types/DataswornSource.js'
import type * as Out from '../types/Datasworn.js'
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
