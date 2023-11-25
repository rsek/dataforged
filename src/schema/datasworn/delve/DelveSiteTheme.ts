import { Type, type Static } from '@sinclair/typebox'
import { JsonTypeDef } from '../../../json-typedef/symbol.js'
import { toJtdElements } from '../../../json-typedef/utils.js'
import { Id, Localize, Metadata } from '../common/index.js'
import { StaticRowPartial, TableRowMixin } from '../oracles/TableRow.js'
import * as Generic from '../Utils.js'
import * as SourcedNodeJs from '../generic/SourcedNode.js'
import * as IdentifiedNodeJs from '../generic/IdentifiedNode.js'
import { ExtractLiteralFromEnum } from '../utils/JsonEnum.js'
import { DelveCardType } from './DelveCard.js'

export const DelveSiteThemeFeatureRow = IdentifiedNodeJs.IdentifiedNode(
	Type.Ref(Id.ThemeFeatureRowId),
	TableRowMixin,
	{ $id: '#/$defs/DelveSiteThemeFeatureRow' }
)
export type DelveSiteThemeFeatureRow = Static<typeof DelveSiteThemeFeatureRow>

export const DelveSiteThemeDangerRow = IdentifiedNodeJs.IdentifiedNode(
	Type.Ref(Id.ThemeDangerRowId),
	TableRowMixin,
	{ $id: '#/$defs/DelveSiteThemeDangerRow' }
)
const DelveSiteThemeFeatures = Type.Array(Type.Ref(DelveSiteThemeFeatureRow))
const DelveSiteThemeDangers = Type.Array(Type.Ref(DelveSiteThemeDangerRow))

export type DelveSiteThemeDangerRow = Static<typeof DelveSiteThemeDangerRow>
export const DelveSiteTheme = SourcedNodeJs.SourcedNode(
	Type.Ref(Id.DelveSiteThemeId),
	Type.Object({
		summary: Type.Ref(Localize.MarkdownString),
		description: Type.Optional(Type.Ref(Localize.MarkdownString)),
		icon: Type.Optional(Type.Ref(Metadata.SvgImageUrl)),
		card_type: ExtractLiteralFromEnum(DelveCardType, 'theme'),
		features: Type.Intersect(
			[
				DelveSiteThemeFeatures,
				Type.Tuple([
					StaticRowPartial({ min: 1, max: 4 }),
					StaticRowPartial({ min: 5, max: 8 }),
					StaticRowPartial({ min: 9, max: 12 }),
					StaticRowPartial({ min: 13, max: 16 }),
					StaticRowPartial({ min: 17, max: 20 })
				])
			],
			{
				[JsonTypeDef]: {
					schema: toJtdElements(DelveSiteThemeFeatures)
				}
			}
		),
		dangers: Type.Intersect(
			[
				DelveSiteThemeDangers,
				Type.Tuple([
					StaticRowPartial({ min: 1, max: 5 }),
					StaticRowPartial({ min: 6, max: 10 }),
					StaticRowPartial({ min: 11, max: 12 }),
					StaticRowPartial({ min: 13, max: 14 }),
					StaticRowPartial({ min: 15, max: 16 }),
					StaticRowPartial({ min: 17, max: 18 }),
					StaticRowPartial({ min: 19, max: 20 }),
					StaticRowPartial({ min: 21, max: 22 }),
					StaticRowPartial({ min: 23, max: 24 }),
					StaticRowPartial({ min: 25, max: 26 }),
					StaticRowPartial({ min: 27, max: 28 }),
					StaticRowPartial({ min: 29, max: 30 })
				])
			],
			{
				[JsonTypeDef]: {
					schema: toJtdElements(DelveSiteThemeDangers)
				}
			}
		)
	}),
	{
		$id: '#/$defs/DelveSiteTheme'
	}
)
export type DelveSiteTheme = Static<typeof DelveSiteTheme>
export type TDelveSiteTheme = typeof DelveSiteTheme
