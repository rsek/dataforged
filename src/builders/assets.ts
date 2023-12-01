import type { Datasworn, DataswornSource } from '../types/index.js'

import {
	sourcedTransformer,
	collectionTransformer,
	type Transformer,
	transform
} from './transformer.js'
import { cloneDeep, mapValues } from 'lodash-es'
import { Move } from './moves.js'
import { trackID } from './id-tracker.js'
import { type SourcedNode } from '../schema/datasworn/generic/SourcedNode.js'
import type * as Generic from '../schema/datasworn/Generic.js'

export const Asset = sourcedTransformer<
	DataswornSource.Asset,
	Datasworn.Asset,
	Datasworn.AssetType
>({
	options: function (
		this: SourcedNode,
		data: DataswornSource.Asset,
		key: string | number,
		parent: SourcedNode
	): Record<string, Datasworn.AssetOptionField> | undefined {
		if (data.options == null) return undefined
		return mapValues(data.options, (fieldData, fieldKey) => {
			const field = cloneDeep(fieldData)
			field.id = `${this.id}/options/${fieldKey}`
			return field as Datasworn.AssetOptionField
		})
	},
	controls: function (
		this: SourcedNode,
		data: DataswornSource.Asset,
		key: string | number,
		parent: SourcedNode
	): Record<string, Datasworn.AssetConditionMeterControlField> | undefined {
		if (data.controls == null) return undefined
		return mapValues(data.controls, (fieldData, fieldKey) => {
			const field = cloneDeep(fieldData)
			field.id = `${this.id}/controls/${fieldKey}`

			if (field.field_type === 'condition_meter' && field.controls != null)
				for (const k in field.controls)
					if (Object.prototype.hasOwnProperty.call(field.controls, k))
						field.controls[k].id = `${field.id}/controls/${k}`

			return field as Datasworn.AssetConditionMeterControlField
		})
	},
	abilities: function (
		this: SourcedNode,
		data: DataswornSource.Asset,
		key: string | number,
		parent: SourcedNode
	): [Datasworn.AssetAbility, Datasworn.AssetAbility, Datasworn.AssetAbility] {
		return data.abilities.map((ability, index) =>
			transform(ability, index, this, AssetAbility)
		) as [
			Datasworn.AssetAbility,
			Datasworn.AssetAbility,
			Datasworn.AssetAbility
		]
	}
})

export const AssetAbility: Transformer<
	DataswornSource.AssetAbility,
	Datasworn.AssetAbility,
	Datasworn.Asset
> = {
	id: function (
		data: DataswornSource.AssetAbility,
		key: string | number,
		parent: SourcedNode
	): string {
		return trackID(`${parent.id}/abilities/${key}`)
	},
	moves: function (
		this: SourcedNode,
		data: DataswornSource.AssetAbility,
		key: string | number,
		parent: SourcedNode
	): Record<string, Datasworn.Move> | undefined {
		if (data.moves == null) return
		return mapValues(data.moves, (moveData, moveKey) =>
			transform(moveData, moveKey, { id: `${this.id}/moves` }, Move)
		)
	},
	options: function (
		this: SourcedNode,
		data: DataswornSource.AssetAbility,
		key: string | number,
		parent: SourcedNode
	): Record<string, Datasworn.AssetAbilityOptionField> | undefined {
		if (data.options == null) return undefined
		return mapValues(data.options, (fieldData, fieldKey) => {
			const field = cloneDeep(fieldData)
			field.id = `${this.id}/options/${fieldKey}`
			return field as Datasworn.AssetAbilityOptionField
		})
	},
	controls: function (
		this: SourcedNode,
		data: DataswornSource.AssetAbility,
		key: string | number,
		parent: SourcedNode
	): Record<string, Datasworn.AssetAbilityControlField> | undefined {
		if (data.controls == null) return undefined
		return mapValues(data.controls, (fieldData, fieldKey) => {
			const field = cloneDeep(fieldData)
			field.id = `${this.id}/controls/${fieldKey}`
			return field as Datasworn.AssetAbilityControlField
		})
	},

	enhance_asset: function (
		this: SourcedNode,
		data: DataswornSource.AssetAbility,
		key: string | number,
		parent: SourcedNode
	): Datasworn.AssetEnhancement | undefined {
		if (data.enhance_moves == null) return undefined

		return data.enhance_asset as Datasworn.AssetEnhancement
	},

	enhance_moves: function (
		this: SourcedNode,
		data: DataswornSource.AssetAbility,
		key: string | number,
		parent: SourcedNode
	): Datasworn.MoveEnhancement[] | undefined {
		if (data.enhance_moves == null) return undefined

		return data.enhance_moves as Datasworn.MoveEnhancement[]
	}
}

export const AssetType = collectionTransformer<
	DataswornSource.AssetType,
	Datasworn.AssetType,
	null
>('assets', Asset, {})
