import type * as In from '../types/io/datasworn-input.js'
import type * as Out from '../types/io/datasworn.js'
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
