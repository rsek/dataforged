import { Type, type Static } from '@sinclair/typebox'
import { Generic, ID, Localize, Metadata } from './common/index.js'
import {
	type TAssetOptionField,
	type TAssetControlField
} from './assets/fields.js'
import { type TAssetAbility } from './assets/ability.js'
import { AssetPropertiesEnhanceable } from './assets/common.js'
import { Merge } from './utils/typebox.js'

const AssetPropertiesUnenhanceable = Type.Object({
	name: Type.Ref(Localize.Label),
	id: Type.Ref(ID.AssetID),
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
	source: Type.Ref(Metadata.Source),
	icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
	color: Type.Optional(Type.Ref(Metadata.CSSColor)),
	options: Type.Optional(
		Generic.Dictionary(
			Type.Ref<TAssetOptionField>('#/$defs/AssetOptionField'),
			{
				description:
					'Options are asset input fields which are set once, usually when the character takes the asset. The most common example is the "name" field on companion assets. A more complex example is the choice of a god\'s stat for the Devotant asset.'
			}
		)
	),
	requirement: Type.Optional(Type.Ref(Localize.MarkdownString)),
	abilities: Type.Array(
		Type.Ref<TAssetAbility>('#/$defs/AssetAbility', {
			description: 'Abilities provided by this asset. Most assets have 3.'
		})
	)
})

export const Asset = Merge(
	AssetPropertiesEnhanceable(
		Type.Ref<TAssetControlField>('#/$defs/AssetControlField')
	),
	AssetPropertiesUnenhanceable,
	{ $id: '#/$defs/Asset', additionalProperties: false }
)
export type TAsset = typeof Asset
export type Asset = Static<typeof Asset>

export const AssetType = Generic.Collection(
	Type.Ref<TAsset>('#/$defs/Asset'),
	Type.Ref(ID.AssetTypeID),
	{ $id: '#/$defs/AssetType' }
)
export type AssetType = Static<typeof AssetType>
export type TAssetType = typeof AssetType

export * from './assets/fields.js'
export * from './assets/ability.js'
export * from './assets/enhancement.js'
