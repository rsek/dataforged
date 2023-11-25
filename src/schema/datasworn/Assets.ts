import { Type, type Static, type TUnsafe } from '@sinclair/typebox'
import * as Generic from './Generic.js'
import { type TAssetAbility } from './assets/Ability.js'
import {
	type TAssetControlField,
	type TAssetOptionField
} from './assets/Fields.js'
import { AssetPropertiesEnhanceable } from './assets/common.js'
import { Id, Localize, Metadata } from './common/index.js'
import * as Utils from './utils/Assign.js'

const AssetMixin = Type.Object({
	asset_type: Type.Ref(Localize.Label, {
		description:
			"A localized category label for this asset. This is the surtitle above the asset's name on the card.",
		examples: [
			'Combat Talent',
			'Command Vehicle',
			'Companion',
			'Deed',
			'Module',
			'Path',
			'Ritual',
			'Support Vehicle'
		]
		// i18n: true
	}),
	icon: Type.Optional(
		Type.Ref(Metadata.SvgImageUrl, { description: "This asset's icon." })
	),
	color: Type.Optional(
		Type.Ref(Metadata.CssColor, {
			description: 'A thematic color associated with this asset.'
		})
	),
	options: Type.Optional(
		Generic.Dictionary(
			Type.Ref<TAssetOptionField>('#/$defs/AssetOptionField'),
			{
				description:
					'Options are asset input fields which are set once, usually when the character takes the asset. The most common example is the "name" field on companion assets. A more complex example is the choice of a god\'s stat for the Devotant asset.'
			}
		)
	),
	requirement: Type.Optional(
		Type.Ref(Localize.MarkdownString, {
			description: 'Describes prerequisites for purchasing or using this asset.'
		})
	),
	abilities: Type.Array(
		Type.Ref<TAssetAbility>('#/$defs/AssetAbility', {
			description: 'Abilities provided by this asset. Most assets have 3.'
		})
	)
})

export const Asset = Generic.Collectable(
	Type.Ref(Id.AssetId),
	Utils.Assign([
		AssetMixin,
		AssetPropertiesEnhanceable(
			Type.Ref<TAssetControlField>('#/$defs/AssetControlField')
		)
	]),
	{ $id: '#/$defs/Asset' }
)
export type TAsset = typeof Asset
export type Asset = Generic.Collectable<
	Static<typeof AssetMixin> &
		Static<ReturnType<typeof AssetPropertiesEnhanceable<TAssetControlField>>>
>

export const AssetType = Generic.Collection(
	Type.Ref(Id.AssetTypeId),
	Type.Ref<TUnsafe<Asset>>('#/$defs/Asset'),
	{
		$id: '#/$defs/AssetType'
	}
)
export type TAssetType = typeof AssetType
export type AssetType = Generic.Collection<Asset>

export * from './assets/Ability.js'
export * from './assets/Enhancement.js'
export * from './assets/Fields.js'

