import type * as In from 'types/input/starforged'
import type * as Out from 'types/output/starforged'
import {
	type SourceHaver,
	sourcedTransformer,
	collectionTransformer
} from './transformer'

export const Asset = sourcedTransformer<In.Asset, Out.Asset>({
	options: function (
		this: SourceHaver,
		data: In.Asset,
		key: string | number,
		parent: SourceHaver
	): Record<string, Out.AssetOptionField> | undefined {
		throw new Error('Function not implemented.')
	},
	controls: function (
		this: SourceHaver,
		data: In.Asset,
		key: string | number,
		parent: SourceHaver
	): Record<string, Out.CheckboxField> | undefined {
		throw new Error('Function not implemented.')
	},
	abilities: function (
		this: SourceHaver,
		data: In.Asset,
		key: string | number,
		parent: SourceHaver
	): [Out.AssetAbility, Out.AssetAbility, Out.AssetAbility] {
		throw new Error('Function not implemented.')
	},
	condition_meter: function (
		this: SourceHaver,
		data: In.Asset,
		key: string | number,
		parent: SourceHaver
	): Out.AssetConditionMeter1 | undefined {
		throw new Error('Function not implemented.')
	}
})

export const AssetType = collectionTransformer<In.AssetType, Out.AssetType>(
	'assets',
	Asset,
	{}
)
