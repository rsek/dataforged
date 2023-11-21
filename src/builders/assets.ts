import type * as In from '../types/io/datasworn-input.js'
import type * as Out from '../types/io/datasworn.js'
import {
	sourcedTransformer,
	collectionTransformer,
	type Transformer,
	transform
} from './transformer.js'
import { cloneDeep, mapValues, omit } from 'lodash-es'
import { Move } from './moves.js'
import { trackID } from './id-tracker.js'
import { type SourcedNode } from '../schema/datasworn/utils/generic.js'
import { type Generic } from '../schema/datasworn/common/index.js'

export const Asset = sourcedTransformer<
	In.Asset,
	Out.Asset,
	Generic.Collection<Out.Asset>
>({
	options: function (
		this: SourcedNode,
		data: In.Asset,
		key: string | number,
		parent: SourcedNode
	): Record<string, Out.AssetOptionField> | undefined {
		if (data.options == null) return undefined
		return mapValues(data.options, (fieldData, fieldKey) => {
			const field = cloneDeep(fieldData)
			field.id = `${this.id}/options/${fieldKey}`
			return field as Out.AssetOptionField
		})
	},
	controls: function (
		this: SourcedNode,
		data: In.Asset,
		key: string | number,
		parent: SourcedNode
	): Record<string, Out.AssetConditionMeterControlField> | undefined {
		if (data.controls == null) return undefined
		return mapValues(data.controls, (fieldData, fieldKey) => {
			const field = cloneDeep(fieldData)
			field.id = `${this.id}/controls/${fieldKey}`

			if (field.field_type === 'condition_meter' && field.controls != null)
				for (const k in field.controls)
					if (Object.prototype.hasOwnProperty.call(field.controls, k))
						field.controls[k].id = `${field.id}/controls/${k}`

			return field as Out.AssetConditionMeterControlField
		})
	},
	abilities: function (
		this: SourcedNode,
		data: In.Asset,
		key: string | number,
		parent: SourcedNode
	): [Out.AssetAbility, Out.AssetAbility, Out.AssetAbility] {
		return data.abilities.map((ability, index) =>
			transform(ability, index, this, AssetAbility)
		) as [Out.AssetAbility, Out.AssetAbility, Out.AssetAbility]
	}
})

export const AssetAbility: Transformer<
	In.AssetAbility,
	Out.AssetAbility,
	Out.Asset
> = {
	id: function (
		data: In.AssetAbility,
		key: string | number,
		parent: SourcedNode
	): string {
		return trackID(`${parent.id}/abilities/${key}`)
	},
	moves: function (
		this: SourcedNode,
		data: In.AssetAbility,
		key: string | number,
		parent: SourcedNode
	): Record<string, Out.Move> | undefined {
		if (data.moves == null) return
		return mapValues(data.moves, (moveData, moveKey) =>
			transform(
				moveData,
				moveKey,
				{ id: `${this.id}/moves`, source: parent.source },
				Move
			)
		)
	},
	options: function (
		this: SourcedNode,
		data: In.AssetAbility,
		key: string | number,
		parent: SourcedNode
	): Record<string, Out.AssetAbilityOptionField> | undefined {
		if (data.options == null) return undefined
		return mapValues(data.options, (fieldData, fieldKey) => {
			const field = cloneDeep(fieldData)
			field.id = `${this.id}/options/${fieldKey}`
			return field as Out.AssetAbilityOptionField
		})
	},
	controls: function (
		this: SourcedNode,
		data: In.AssetAbility,
		key: string | number,
		parent: SourcedNode
	): Record<string, Out.AssetAbilityControlField> | undefined {
		if (data.controls == null) return undefined
		return mapValues(data.controls, (fieldData, fieldKey) => {
			const field = cloneDeep(fieldData)
			field.id = `${this.id}/controls/${fieldKey}`
			return field as Out.AssetAbilityControlField
		})
	},

	enhance_asset: function (
		this: SourcedNode,
		data: In.AssetAbility,
		key: string | number,
		parent: SourcedNode
	): Out.AssetEnhancement | undefined {
		if (data.enhance_moves == null) return undefined

		return data.enhance_asset as Out.AssetEnhancement
	},

	enhance_moves: function (
		this: SourcedNode,
		data: In.AssetAbility,
		key: string | number,
		parent: SourcedNode
	): Out.MoveEnhancement[] | undefined {
		if (data.enhance_moves == null) return undefined

		return data.enhance_moves as Out.MoveEnhancement[]
	}
}

export const AssetType = collectionTransformer<In.AssetType, Out.AssetType>(
	'assets',
	Asset,
	{}
)
