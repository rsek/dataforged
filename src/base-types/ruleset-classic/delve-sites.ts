import { type Static, Type } from '@sinclair/typebox'
import {
	Utils,
	ID,
	Localize,
	Enum,
	Metadata,
	Abstract
} from 'base-types/common'
import { OracleTableRow } from 'base-types/oracles'

const StaticRowStub = (low: number, high: number, defaultResultText?: string) =>
	Type.Object({
		low: Type.Literal(low),
		high: Type.Literal(high),
		result:
			defaultResultText != null
				? Type.String({ default: defaultResultText })
				: Type.Undefined()
	})

export const DelveSiteDenizenFrequency = Utils.StringEnum(
	['very_common', 'common', 'uncommon', 'rare', 'unforeseen'],
	{ $id: '#/$defs/DelveSiteDenizenFrequency' }
)
export type DelveSiteDenizenFrequency = Static<typeof DelveSiteDenizenFrequency>

export const DelveSiteDenizen = Type.Object(
	{
		id: Type.Ref(ID.DelveSiteDenizenID),
		name: Type.Optional(Type.Ref(Localize.Label)),
		low: Type.Integer({ minimum: 1, maximum: 100 }),
		high: Type.Integer({ minimum: 1, maximum: 100 }),
		encounter: Type.Optional(Type.Ref(ID.EncounterClassicID)),
		frequency: DelveSiteDenizenFrequency
	},
	{ $id: '#/$defs/DelveSiteDenizen' }
)

const StaticDenizenRowStub = (
	low: number,
	high: number,
	frequency: DelveSiteDenizenFrequency
) =>
	Type.Composite([
		StaticRowStub(low, high),
		Type.Object({ frequency: Type.Literal(frequency) })
	])

export const DelveSite = Type.Composite(
	[
		Abstract.SourcedNode,
		Type.Object({
			id: Type.Ref(ID.DelveSiteID),
			name: Type.Ref(Localize.Label),
			icon: Type.Optional(Type.Ref(Metadata.SvgImageURL)),
			rank: Type.Ref(Enum.ChallengeRank),
			theme: Type.Ref(ID.DelveSiteThemeID),
			domain: Type.Ref(ID.DelveSiteDomainID),
			extra_card: Type.Optional(
				Type.Union(
					[Type.Ref(ID.DelveSiteThemeID), Type.Ref(ID.DelveSiteDomainID)],
					{
						description:
							'An additional theme or domain card for use with optional rules in Ironsworn: Delve.'
					}
				)
			),
			description: Localize.MarkdownString,
			denizens: Type.Intersect([
				Type.Array(DelveSiteDenizen),
				Type.Tuple([
					StaticDenizenRowStub(1, 27, 'very_common'),
					StaticDenizenRowStub(28, 41, 'common'),
					StaticDenizenRowStub(42, 55, 'common'),
					StaticDenizenRowStub(56, 69, 'common'),
					StaticDenizenRowStub(70, 75, 'uncommon'),
					StaticDenizenRowStub(76, 81, 'uncommon'),
					StaticDenizenRowStub(82, 87, 'uncommon'),
					StaticDenizenRowStub(88, 93, 'uncommon'),
					StaticDenizenRowStub(94, 95, 'rare'),
					StaticDenizenRowStub(96, 97, 'rare'),
					StaticDenizenRowStub(98, 99, 'rare'),
					StaticDenizenRowStub(100, 100, 'unforeseen')
				])
			])
		})
	],
	{ $id: '#/$defs/DelveSite' }
)

export type DelveSite = Static<typeof DelveSite>

const DelveSiteCard = Type.Composite([
	Abstract.SourcedNode,
	Type.Object({
		name: Type.Ref(Localize.Label),
		summary: Type.Ref(Localize.MarkdownString),
		description: Type.Optional(Type.Ref(Localize.MarkdownString)),
		icon: Type.Optional(Type.Ref(Metadata.SvgImageURL))
	})
])

export const DelveSiteTheme = Type.Composite(
	[
		DelveSiteCard,
		Type.Object({
			id: Type.Ref(ID.DelveSiteThemeID),
			card_type: Type.Literal('theme'),
			features: Type.Intersect([
				Type.Array(
					Type.Composite(
						[
							Type.Omit(OracleTableRow, ['id']),
							Type.Object({ id: Type.Ref(ID.ThemeFeatureRowID) })
						],
						{ title: 'Site theme feature row' }
					)
				),
				Type.Tuple([
					StaticRowStub(1, 4),
					StaticRowStub(5, 8),
					StaticRowStub(9, 12),
					StaticRowStub(13, 16),
					StaticRowStub(17, 20)
				])
			]),
			dangers: Type.Intersect([
				Type.Array(
					Type.Composite(
						[
							Type.Omit(OracleTableRow, ['id']),
							Type.Object({ id: Type.Ref(ID.ThemeDangerRowID) })
						],
						{ title: 'Site theme danger row' }
					)
				),
				Type.Tuple([
					StaticRowStub(1, 5),
					StaticRowStub(6, 10),
					StaticRowStub(11, 12),
					StaticRowStub(13, 14),
					StaticRowStub(15, 16),
					StaticRowStub(17, 18),
					StaticRowStub(19, 20),
					StaticRowStub(21, 22),
					StaticRowStub(23, 24),
					StaticRowStub(25, 26),
					StaticRowStub(27, 28),
					StaticRowStub(29, 30)
				])
			])
		})
	],
	{ $id: '#/$defs/DelveSiteTheme', title: 'Delve site theme' }
)
export type DelveSiteTheme = Static<typeof DelveSiteTheme>

export const DelveSiteDomain = Type.Composite(
	[
		DelveSiteCard,
		Type.Object({
			id: Type.Ref(ID.DelveSiteDomainID),
			card_type: Type.Literal('domain'),
			features: Type.Intersect([
				Type.Array(
					Type.Composite(
						[
							Type.Omit(OracleTableRow, ['id']),
							Type.Object({ id: Type.Ref(ID.DomainFeatureRowID) })
						],
						{ title: 'Site domain feature row' }
					)
				),
				Type.Tuple([
					StaticRowStub(21, 43),
					StaticRowStub(44, 56),
					StaticRowStub(57, 64),
					StaticRowStub(65, 68),
					StaticRowStub(69, 72),
					StaticRowStub(73, 76),
					StaticRowStub(77, 80),
					StaticRowStub(81, 84),
					StaticRowStub(85, 88),
					StaticRowStub(89, 98, 'Something unusual or unexpected'),
					StaticRowStub(99, 99, 'You transition into a new theme'),
					StaticRowStub(100, 100, 'You transition into a new domain')
				])
			]),
			dangers: Type.Intersect([
				Type.Array(
					Type.Composite(
						[
							Type.Omit(OracleTableRow, ['id']),
							Type.Object({ id: Type.Ref(ID.DomainDangerRowID) })
						],
						{ title: 'Site domain danger row' }
					)
				),
				Type.Tuple([
					StaticRowStub(31, 33),
					StaticRowStub(34, 36),
					StaticRowStub(37, 39),
					StaticRowStub(40, 42),
					StaticRowStub(43, 45)
				])
			])
		})
	],
	{ $id: '#/$defs/DelveSiteDomain', title: 'Delve site domain' }
)
export type DelveSiteDomain = Static<typeof DelveSiteDomain>
