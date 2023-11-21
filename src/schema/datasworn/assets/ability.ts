import { Type, type Static } from '@sinclair/typebox'
import { Generic, ID, Localize } from '../common/index.js'
import * as Moves from '../moves.js'
import { AssetAbilityControlField, AssetAbilityOptionField } from './fields.js'
import { AssetEnhancement } from './enhancement.js'

export const AssetAbility = Type.Object(
	{
		id: Type.Ref(ID.AssetAbilityID),
		name: Type.Optional(Type.Ref(Localize.Label)),
		text: Type.Ref(Localize.MarkdownString),
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
	},
	{ $id: '#/$defs/AssetAbility' }
)
export type AssetAbility = Static<typeof AssetAbility>
export type TAssetAbility = typeof AssetAbility
