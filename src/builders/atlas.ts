import type { Datasworn, DataswornSource } from '../types/index.js'

import {
	recursiveCollectionTransformer,
	sourcedTransformer
} from './transformer.js'

export const AtlasEntry = sourcedTransformer<
	DataswornSource.AtlasEntry,
	Datasworn.AtlasEntry,
	Datasworn.Atlas
>({})

export const Atlas = recursiveCollectionTransformer<
	DataswornSource.Atlas,
	Datasworn.Atlas,
	null
>('atlas', AtlasEntry, {})
