import { type Static, Type } from '@sinclair/typebox'
import { Range, SourcedNode } from 'base-types/abstract'
import {
	DelveSiteDenizenID,
	DelveSiteDomainID,
	DelveSiteID,
	DelveSiteThemeID,
	DomainDangerRowID,
	DomainFeatureRowID,
	EncounterClassicID,
	ThemeDangerRowID,
	ThemeFeatureRowID
} from 'base-types/id'
import { Label, MarkdownString } from 'base-types/localize'
import { SvgImageURL } from 'base-types/metadata'
import { OracleTableRow } from 'base-types/oracles'
import { ChallengeRank } from 'base-types/progress'
import { StringEnum } from 'base-types/utils'

const DelveSiteDenizenFrequency = StringEnum(
	['very_common', 'common', 'uncommon', 'rare', 'unforeseen'],
	{ $id: 'DelveSiteDenizenFrequency' }
)
export type DelveSiteDenizenFrequency = Static<typeof DelveSiteDenizenFrequency>

const DelveSiteDenizen = Type.Composite([
	Range,
	Type.Object({
		id: DelveSiteDenizenID,
		name: Type.Optional(Label),
		low: Type.Integer(),
		high: Type.Integer(),
		encounter: Type.Optional(Type.Ref(EncounterClassicID)),
		frequency: DelveSiteDenizenFrequency
	})
])

const StaticDenizenRowStub = (
	low: number,
	high: number,
	frequency: DelveSiteDenizenFrequency
) =>
	Type.Composite([
		StaticRowStub(low, high),
		Type.Object({ frequency: Type.Literal(frequency) })
	])

export const DelveSite = Type.Composite([
	SourcedNode,
	Type.Object({
		id: DelveSiteID,
		name: Label,
		icon: Type.Optional(SvgImageURL),
		rank: Type.Ref(ChallengeRank),
		theme: Type.Ref(DelveSiteThemeID),
		domain: Type.Ref(DelveSiteDomainID),
		extra_card: Type.Optional(
			Type.Union([Type.Ref(DelveSiteThemeID), Type.Ref(DelveSiteDomainID)], {
				description:
					'An additional theme or domain card for use with optional rules in Ironsworn: Delve.'
			})
		),
		description: MarkdownString,
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
])

export type DelveSite = Static<typeof DelveSite>

const StaticRowStub = (low: number, high: number, defaultResultText?: string) =>
	Type.Object({
		low: Type.Literal(low),
		high: Type.Literal(high),
		result:
			defaultResultText != null
				? Type.String({ default: defaultResultText })
				: Type.Undefined()
	})

const ThemeFeatureRow = Type.Composite(
	[Type.Omit(OracleTableRow, ['id']), Type.Object({ id: ThemeFeatureRowID })],
	{ $id: 'ThemeFeatureRow' }
)

const ThemeDangerRow = Type.Composite(
	[Type.Omit(OracleTableRow, ['id']), Type.Object({ id: ThemeDangerRowID })],
	{ $id: 'ThemeDangerRow' }
)

const DomainFeatureRow = Type.Composite(
	[Type.Omit(OracleTableRow, ['id']), Type.Object({ id: DomainFeatureRowID })],
	{ $id: 'DomainFeatureRow' }
)

const DomainDangerRow = Type.Composite(
	[Type.Omit(OracleTableRow, ['id']), Type.Object({ id: DomainDangerRowID })],
	{ $id: 'DomainDangerRow' }
)

const DelveSiteCard = Type.Composite([
	SourcedNode,
	Type.Object({
		name: Label,
		summary: MarkdownString,
		description: Type.Optional(MarkdownString),
		icon: Type.Optional(SvgImageURL)
	})
])

export const DelveSiteTheme = Type.Composite([
	DelveSiteCard,
	Type.Object({
		id: DelveSiteThemeID,
		card_type: Type.Literal('theme'),
		features: Type.Intersect([
			Type.Array(ThemeFeatureRow),
			Type.Tuple([
				StaticRowStub(1, 4),
				StaticRowStub(5, 8),
				StaticRowStub(9, 12),
				StaticRowStub(13, 16),
				StaticRowStub(17, 20)
			])
		]),
		dangers: Type.Intersect([
			Type.Array(ThemeDangerRow),
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
])
export type DelveSiteTheme = Static<typeof DelveSiteTheme>

export const DelveSiteDomain = Type.Composite([
	DelveSiteCard,
	Type.Object({
		id: DelveSiteDomainID,
		card_type: Type.Literal('domain'),
		features: Type.Intersect([
			Type.Array(DomainFeatureRow),
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
			Type.Array(DomainDangerRow),
			Type.Tuple([
				StaticRowStub(31, 33),
				StaticRowStub(34, 36),
				StaticRowStub(37, 39),
				StaticRowStub(40, 42),
				StaticRowStub(43, 45)
			])
		])
	})
])
export type DelveSiteDomain = Static<typeof DelveSiteDomain>
