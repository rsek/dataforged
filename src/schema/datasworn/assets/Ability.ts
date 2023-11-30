import { Type, type Static } from '@sinclair/typebox'
import * as Moves from '../Moves.js'
import { Id, Localize } from '../common/index.js'
import * as Generic from '../Generic.js'
import { AssetEnhancement } from './Enhancement.js'
import { AssetAbilityControlField, AssetAbilityOptionField } from './Fields.js'

export const AssetAbility = Generic.IdentifiedNode(
	Type.Ref(Id.AssetAbilityId),
	Type.Object({
		name: Type.Optional(
			Type.Ref(Localize.Label, {
				description:
					'A handful of asset abilities have a label/name, for instance classic Ironsworn companion assets. Most canonical assets omit this property.'
			})
		),
		text: Type.Ref(Localize.MarkdownString, {
			description: 'The complete rules text of this asset ability.'
		}),
		enabled: Type.Boolean({
			default: false,
			description: 'Is this asset ability enabled?'
		}),
		moves: Type.Optional(
			Generic.Dictionary(Type.Ref(Moves.Move), {
				description: 'Unique moves added by this asset ability.'
			})
		),
		options: Type.Optional(
			Generic.Dictionary(Type.Ref(AssetAbilityOptionField), {
				description:
					'Fields that are expected to be set once and remain the same through the life of the asset.'
			})
		),
		controls: Type.Optional(
			Generic.Dictionary(Type.Ref(AssetAbilityControlField), {
				description:
					'Fields whose values are expected to change over the life of the asset.'
			})
		),
		enhance_asset: Type.Optional(
			Type.Ref(AssetEnhancement, {
				description: 'Changes made to the asset, when this ability is enabled.'
			})
		),
		enhance_moves: Type.Optional(
			Type.Array(Type.Ref(Moves.MoveEnhancement), {
				description:
					'Describes changes made to various moves by this asset ability. Usually these require specific trigger conditions.'
				// releaseStage: 'experimental'
			})
		)
	}),
	{
		$id: 'AssetAbility',
		description:
			'An asset ability: one of the purchasable features of an asset. Most assets have three.'
	}
)
export type AssetAbility = Static<typeof AssetAbility>
export type TAssetAbility = typeof AssetAbility
