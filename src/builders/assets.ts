import type * as In from 'types/input/starforged'
import type * as Out from 'types/output/starforged'
import {
	type SourceHaver,
	sourcedTransformer,
	collectionTransformer,
	type Transformer,
	transform
} from './transformer'
import { cloneDeep, mapValues } from 'lodash'
import { Move } from 'builders/moves'
import { trackID } from 'builders/id-tracker'

export const Asset = sourcedTransformer<In.Asset, Out.Asset>({
	options: function (
		this: SourceHaver,
		data: In.Asset,
		key: string | number,
		parent: SourceHaver
	): Record<string, Out.AssetOptionField> | undefined {
		if (data.options == null) return undefined
		return mapValues(data.options, (fieldData, fieldKey) => {
			const field = cloneDeep(fieldData)
			field.id = `${this.id}/options/${fieldKey}`
			return field as Out.AssetOptionField
		})
	},
	controls: function (
		this: SourceHaver,
		data: In.Asset,
		key: string | number,
		parent: SourceHaver
	): Record<string, Out.CheckboxField> | undefined {
		if (data.controls == null) return undefined
		return mapValues(data.controls, (fieldData, fieldKey) => {
			const field = cloneDeep(fieldData)
			field.id = `${this.id}/controls/${fieldKey}`
			return field as Out.AssetControlField
		})
	},
	abilities: function (
		this: SourceHaver,
		data: In.Asset,
		key: string | number,
		parent: SourceHaver
	): [Out.AssetAbility, Out.AssetAbility, Out.AssetAbility] {
		return data.abilities.map((ability, index) =>
			transform(ability, index, this, AssetAbility)
		) as [Out.AssetAbility, Out.AssetAbility, Out.AssetAbility]
	},
	condition_meter: function (
		this: SourceHaver,
		data: In.Asset,
		key: string | number,
		parent: SourceHaver
	): Out.AssetConditionMeter1 | undefined {
		if (data.condition_meter == null) return undefined
		const meter = cloneDeep(data.condition_meter)
		meter.id = `${this.id}/condition_meter`
		if (meter.controls != null) {
			meter.controls = mapValues(meter.controls, (field, fieldKey) => {
				field.id = trackID(`${meter.id as string}/controls/${fieldKey}`)
				return field
			})
		}
		return meter as Out.AssetConditionMeter1
	}
})

export const AssetAbility: Transformer<In.AssetAbility, Out.AssetAbility> = {
	id: function (
		data: In.AssetAbility,
		key: string | number,
		parent: SourceHaver
	): string {
		return trackID(`${parent.id}/abilities/${key}`)
	},
	moves: function (
		this: SourceHaver,
		data: In.AssetAbility,
		key: string | number,
		parent: SourceHaver
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
		this: SourceHaver,
		data: In.AssetAbility,
		key: string | number,
		parent: SourceHaver
	): Record<string, Out.AssetAbilityOptionField> | undefined {
		if (data.options == null) return undefined
		return mapValues(data.options, (fieldData, fieldKey) => {
			const field = cloneDeep(fieldData)
			field.id = `${this.id}/options/${fieldKey}`
			return field as Out.AssetAbilityOptionField
		})
	},
	controls: function (
		this: SourceHaver,
		data: In.AssetAbility,
		key: string | number,
		parent: SourceHaver
	): Record<string, Out.AssetAbilityControlField> | undefined {
		if (data.controls == null) return undefined
		return mapValues(data.controls, (fieldData, fieldKey) => {
			const field = cloneDeep(fieldData)
			field.id = `${this.id}/controls/${fieldKey}`
			return field as Out.AssetAbilityControlField
		})
	},
	augment_asset: function (
		this: SourceHaver,
		data: In.AssetAbility,
		key: string | number,
		parent: SourceHaver
	):
		| {
				suggestions?: Out.Suggestions | undefined
				count_as_impact?: boolean | undefined
				attachments?: Out.AssetAttachment | undefined
				shared?: boolean | undefined
		  } & { condition_meter?: Out.AssetConditionMeter | undefined } {
		return data.augment_asset as any
	},
	augment_moves: function (
		this: SourceHaver,
		data: In.AssetAbility,
		key: string | number,
		parent: SourceHaver
	): Out.MoveAugment[] | undefined {
		return data.augment_moves as any
	}
}

export const AssetType = collectionTransformer<In.AssetType, Out.AssetType>(
	'assets',
	Asset,
	{}
)
