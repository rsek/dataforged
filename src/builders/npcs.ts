import {
	transform,
	collectionTransformer,
	sourcedTransformer,
	type Transformer
} from './transformer.js'
import { mapValues } from 'lodash-es'
import type * as In from '../types/io/datasworn-source.js'
import type * as Out from '../types/io/datasworn.js'

export const NpcVariant: Transformer<In.NpcVariant, Out.NpcVariant, Out.Npc> = {
	id(data, key, parent) {
		return `${parent.id}/variants/${key}`
	}
}

export const Npc = sourcedTransformer<In.Npc, Out.Npc>({
	variants(
		this,
		data,
		key,
		parent
	): Record<string, Out.NpcVariant> | undefined {
		if (data.variants == null) return undefined

		return mapValues(data.variants, (variant, key) =>
			transform(variant, key, this as Out.Npc, NpcVariant)
		)
	}
})

export const NpcCollection = collectionTransformer<
	In.NpcCollection,
	Out.NpcCollection
>('npcs', Npc, {})
