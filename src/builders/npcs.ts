import {
	transform,
	collectionTransformer,
	sourcedTransformer,
	type Transformer
} from './transformer.js'
import { mapValues } from 'lodash-es'
import type * as In from '../types/DataswornSource.js'
import type * as Out from '../types/Datasworn.js'
import type { Datasworn, DataswornSource } from '../types/index.js'

export const NpcVariant: Transformer<
	DataswornSource.NpcVariant,
	Datasworn.NpcVariant,
	Datasworn.Npc
> = {
	id(data, key, parent) {
		return `${parent.id}/variants/${key}`
	}
}

export const Npc = sourcedTransformer<DataswornSource.Npc, Datasworn.Npc>({
	variants(
		this,
		data,
		key,
		parent
	): Record<string, Datasworn.NpcVariant> | undefined {
		if (data.variants == null) return undefined

		return mapValues(data.variants, (variant, key) =>
			transform(variant, key, this as Datasworn.Npc, NpcVariant)
		)
	}
})

export const NpcCollection = collectionTransformer<
	DataswornSource.NpcCollection,
	Datasworn.NpcCollection
>('npcs', Npc, {})
