import { trackID } from 'builders/id-tracker'
import {
	transform,
	collectionTransformer,
	sourcedTransformer,
	type Transformer
} from 'builders/transformer'
import { mapValues } from 'lodash'
import type * as In from 'types/input/starforged'
import type * as Out from 'types/output/starforged'

export const NpcVariant: Transformer<In.NpcVariant, Out.NpcVariant, Out.Npc> = {
	id(data, key, parent) {
		return `${parent.id}/variants/${key}`
	}
}

export const Npc = sourcedTransformer<In.Npc, Out.Npc>({
	// id(this, data, key, parent) {
	// 	const id = `${}`
	// 	return trackID(id)
	// },
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
