import { Type, type Static } from '@sinclair/typebox'
import { JsonTypeDef } from '../../../json-typedef/symbol.js'
import { toJtdElements } from '../../../json-typedef/utils.js'
import { Generic, ID, Localize, Metadata } from '../common/index.js'
import { StaticRowPartial, TableRow } from '../oracles/TableRow.js'
import { DelveCardMixin } from './DelveCard.js'

export const DelveSiteDomainFeatureRow = Generic.IdentifiedNode(
	Type.Ref(ID.DomainFeatureRowID),
	TableRow({
		min: Type.Integer(),
		max: Type.Integer()
	}),
	{ $id: '#/$defs/DelveSiteDomainFeatureRow' }
)
export type DelveSiteDomainFeatureRow = Static<typeof DelveSiteDomainFeatureRow>
export const DelveSiteDomainDangerRow = Generic.IdentifiedNode(
	Type.Ref(ID.DomainDangerRowID),
	TableRow({
		min: Type.Integer(),
		max: Type.Integer()
	}),
	{ $id: '#/$defs/DelveSiteDomainDangerRow' }
)
export type DelveSiteDomainDangerRow = Static<typeof DelveSiteDomainDangerRow>

const DelveSiteDomainFeatures = Type.Array(Type.Ref(DelveSiteDomainFeatureRow))

const DelveSiteDomainDangers = Type.Array(Type.Ref(DelveSiteDomainDangerRow))

export const DelveSiteDomain = Generic.SourcedNode(
	Type.Ref(ID.DelveSiteDomainID),
	Type.Object({
		summary: Type.Ref(Localize.MarkdownString),
		description: Type.Optional(Type.Ref(Localize.MarkdownString)),
		icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
		card_type: Type.Literal('domain'),
		name_oracle: Type.Optional(
			Type.Ref(ID.OracleTableID, {
				description:
					'An oracle table ID containing place name elements. For examples, see oracle ID `delve/oracles/site_name/place/barrow`, and its siblings in oracle collection ID `delve/collections/oracles/site_name/place`. These oracles are used by the site name oracle from Ironsworn: Delve (ID: delve/oracles/site_name/format) to create random names for delve sites.'
			})
		),
		features: Type.Intersect(
			[
				DelveSiteDomainFeatures,
				Type.Tuple([
					StaticRowPartial({ min: 21, max: 43 }),
					StaticRowPartial({ min: 44, max: 56 }),
					StaticRowPartial({ min: 57, max: 64 }),
					StaticRowPartial({ min: 65, max: 68 }),
					StaticRowPartial({ min: 69, max: 72 }),
					StaticRowPartial({ min: 73, max: 76 }),
					StaticRowPartial({ min: 77, max: 80 }),
					StaticRowPartial({ min: 81, max: 84 }),
					StaticRowPartial({ min: 85, max: 88 }),
					StaticRowPartial(
						{ min: 89, max: 98 },
						{
							result: 'Something unusual or unexpected',
							suggestions: {
								oracles: [
									// 'classic/oracles/action_and_theme/action',
									// 'classic/oracles/action_and_theme/theme',
									'delve/oracles/feature/aspect',
									'delve/oracles/feature/focus'
								]
							}
						}
					),
					StaticRowPartial(
						{ min: 99, max: 99 },
						{
							result: 'You transition into a new theme',
							suggestions: {
								oracles: ['delve/oracles/site_nature/theme']
							}
						}
					),
					StaticRowPartial(
						{ min: 100, max: 100 },
						{
							result: 'You transition into a new domain',
							suggestions: {
								oracles: ['delve/oracles/site_nature/domain']
							}
						}
					)
				])
			],
			{
				[JsonTypeDef]: {
					schema: toJtdElements(DelveSiteDomainFeatures)
				}
			}
		),
		dangers: Type.Intersect(
			[
				DelveSiteDomainDangers,
				Type.Tuple([
					StaticRowPartial({ min: 31, max: 33 }),
					StaticRowPartial({ min: 34, max: 36 }),
					StaticRowPartial({ min: 37, max: 39 }),
					StaticRowPartial({ min: 40, max: 42 }),
					StaticRowPartial({ min: 43, max: 45 })
				])
			],
			{
				[JsonTypeDef]: {
					schema: toJtdElements(DelveSiteDomainDangers)
				}
			}
		)
	}),
	{
		$id: '#/$defs/DelveSiteDomain'
	}
)
// console.log(DelveSiteDomain)
// console.log(DelveSiteDomainPartial)
// console.log(DelveSiteDomain)
export type DelveSiteDomain = Static<typeof DelveSiteDomain>
export type TDelveSiteDomain = typeof DelveSiteDomain
