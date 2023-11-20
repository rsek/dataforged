import { Type, type Static } from '@sinclair/typebox'
import { Dictionary } from '../common/abstract.js'
import { DeepPartial, NoDefaults, Nullable } from '../common/utils.js'
import { AssetIDWildcard } from '../common/id.js'
import { AssetConditionMeter } from './fields.js'
import { AssetPropertiesEnhanceable } from './common.js'

export const AssetAttachment = Type.Object(
	{
		assets: Type.Array(Type.Ref(AssetIDWildcard), {
			description:
				'Asset IDs (which may be wildcards) that may be attached to this asset'
		}),
		max: Nullable(Type.Integer({ minimum: 1 }), {
			default: null,
			description:
				"Null if there's no upper limit to the number of attached assets."
		})
	},
	{
		$id: '#/$defs/AssetAttachment',
		description:
			"Describes which assets can be attached to this asset. Example: Starforged's Module assets, which can be equipped by Command Vehicle assets. See p. 55 of Starforged for more info."
	}
)
export type TAssetAttachment = typeof AssetAttachment
export type AssetAttachment = Static<TAssetAttachment>

export const AssetConditionMeterEnhancement = NoDefaults(
	Type.Partial(
		Type.Omit(AssetConditionMeter, [
			'name',
			'value',
			'id',
			'moves',
			'min',
			'field_type',
			'controls' // condition meters accept only boolean controls, which can't be enhanced
		]),
		{ $id: '#/$defs/AssetConditionMeterEnhancement' }
	)
)
export type AssetConditionMeterEnhancement = Static<
	typeof AssetConditionMeterEnhancement
>

export const AssetEnhancement = DeepPartial(
	NoDefaults(
		AssetPropertiesEnhanceable(
			// for the moment, it's only practical to enhance condition meters
			Type.Optional(Dictionary(Type.Ref(AssetConditionMeterEnhancement)))
		)
	),
	{
		description:
			'Describes enhancements made to this asset in a partial asset object. The changes should be applied recursively; only the values that are specified should be changed.',
		$id: '#/$defs/AssetEnhancement'
	}
)
export type TAssetEnhancement = typeof AssetEnhancement
export type AssetEnhancement = Static<typeof AssetEnhancement>
