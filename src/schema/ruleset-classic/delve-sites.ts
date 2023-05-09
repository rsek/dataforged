import {
	type Static,
	Type,
	type ObjectOptions,
	type TProperties
} from '@sinclair/typebox'
import { Utils, ID, Localize, Enum, Metadata, Abstract } from 'schema/common'
import { Squash } from 'schema/common/utils'
import { OracleTableRow } from 'schema/oracles'

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
		encounter: Type.Optional(
			Type.Ref(ID.EncounterClassicID, {
				description: 'The ID of the relevant encounter, if one is specified.'
			})
		),
		frequency: Type.Ref(DelveSiteDenizenFrequency)
	},
	{ $id: '#/$defs/DelveSiteDenizen' }
)
export type DelveSiteDenizen = Static<typeof DelveSiteDenizen>

const StaticDenizenRowStub = (
	low: number,
	high: number,
	frequency: DelveSiteDenizenFrequency
) =>
	Squash([
		Abstract.StaticRowStub({ low, high }),
		Type.Object({ frequency: Type.Literal(frequency) })
	])

export const DelveSite = Abstract.SourcedNode(
	{
		id: Type.Ref(ID.DelveSiteID),
		icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
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
		description: Type.Ref(Localize.MarkdownString),
		denizens: Type.Intersect([
			Type.Array(Type.Ref(DelveSiteDenizen)),
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
	},
	{
		$id: '#/$defs/DelveSite',
		description: 'A delve site with a theme, domain, and denizen table.'
	}
)

export type DelveSite = Static<typeof DelveSite>

const DelveSiteCard = (properties: TProperties, options: ObjectOptions = {}) =>
	Abstract.SourcedNode(
		{
			summary: Type.Ref(Localize.MarkdownString),
			description: Type.Optional(Type.Ref(Localize.MarkdownString)),
			icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
			...properties
		},
		options
	)

export const DelveSiteThemeFeatureRow = Type.Composite(
	[
		Type.Omit(OracleTableRow, ['id']),
		Type.Object({ id: Type.Ref(ID.ThemeFeatureRowID) })
	],
	{ $id: '#/$defs/DelveSiteThemeFeatureRow' }
)
export type DelveSiteThemeFeatureRow = Static<typeof DelveSiteThemeFeatureRow>
export const DelveSiteThemeDangerRow = Type.Composite(
	[
		Type.Omit(OracleTableRow, ['id']),
		Type.Object({ id: Type.Ref(ID.ThemeDangerRowID) })
	],
	{ $id: '#/$defs/DelveSiteThemeDangerRow' }
)
export type DelveSiteThemeDangerRow = Static<typeof DelveSiteThemeDangerRow>
export const DelveSiteTheme = DelveSiteCard(
	{
		id: Type.Ref(ID.DelveSiteThemeID),
		card_type: Type.Literal('theme'),
		features: Type.Intersect([
			Type.Array(Type.Ref(DelveSiteThemeFeatureRow)),
			Type.Tuple([
				Abstract.StaticRowStub({ low: 1, high: 4 }),
				Abstract.StaticRowStub({ low: 5, high: 8 }),
				Abstract.StaticRowStub({ low: 9, high: 12 }),
				Abstract.StaticRowStub({ low: 13, high: 16 }),
				Abstract.StaticRowStub({ low: 17, high: 20 })
			])
		]),
		dangers: Type.Intersect([
			Type.Array(Type.Ref(DelveSiteThemeDangerRow)),
			Type.Tuple([
				Abstract.StaticRowStub({ low: 1, high: 5 }),
				Abstract.StaticRowStub({ low: 6, high: 10 }),
				Abstract.StaticRowStub({ low: 11, high: 12 }),
				Abstract.StaticRowStub({ low: 13, high: 14 }),
				Abstract.StaticRowStub({ low: 15, high: 16 }),
				Abstract.StaticRowStub({ low: 17, high: 18 }),
				Abstract.StaticRowStub({ low: 19, high: 20 }),
				Abstract.StaticRowStub({ low: 21, high: 22 }),
				Abstract.StaticRowStub({ low: 23, high: 24 }),
				Abstract.StaticRowStub({ low: 25, high: 26 }),
				Abstract.StaticRowStub({ low: 27, high: 28 }),
				Abstract.StaticRowStub({ low: 29, high: 30 })
			])
		])
	},
	{ $id: '#/$defs/DelveSiteTheme', title: 'Delve site theme' }
)
export type DelveSiteTheme = Static<typeof DelveSiteTheme>

export const DelveSiteDomainFeatureRow = Type.Composite(
	[
		Type.Omit(OracleTableRow, ['id']),
		Type.Object({ id: Type.Ref(ID.DomainFeatureRowID) })
	],
	{ $id: '#/$defs/DelveSiteDomainFeatureRow' }
)
export type DelveSiteDomainFeatureRow = Static<typeof DelveSiteDomainFeatureRow>
export const DelveSiteDomainDangerRow = Type.Composite(
	[
		Type.Omit(OracleTableRow, ['id']),
		Type.Object({ id: Type.Ref(ID.DomainDangerRowID) })
	],
	{ $id: '#/$defs/DelveSiteDomainDangerRow' }
)
export type DelveSiteDomainDangerRow = Static<typeof DelveSiteDomainDangerRow>
export const DelveSiteDomain = DelveSiteCard(
	{
		id: Type.Ref(ID.DelveSiteDomainID),
		card_type: Type.Literal('domain'),
		features: Type.Intersect([
			Type.Array(Type.Ref(DelveSiteDomainFeatureRow)),
			Type.Tuple([
				Abstract.StaticRowStub({ low: 21, high: 43 }),
				Abstract.StaticRowStub({ low: 44, high: 56 }),
				Abstract.StaticRowStub({ low: 57, high: 64 }),
				Abstract.StaticRowStub({ low: 65, high: 68 }),
				Abstract.StaticRowStub({ low: 69, high: 72 }),
				Abstract.StaticRowStub({ low: 73, high: 76 }),
				Abstract.StaticRowStub({ low: 77, high: 80 }),
				Abstract.StaticRowStub({ low: 81, high: 84 }),
				Abstract.StaticRowStub({ low: 85, high: 88 }),
				Abstract.StaticRowStub(
					{ low: 89, high: 98 },
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
				Abstract.StaticRowStub(
					{ low: 99, high: 99 },
					{
						result: 'You transition into a new theme',
						suggestions: {
							oracles: ['delve/oracles/site_nature/theme']
						}
					}
				),
				Abstract.StaticRowStub(
					{ low: 100, high: 100 },
					{
						result: 'You transition into a new domain',
						suggestions: {
							oracles: ['delve/oracles/site_nature/domain']
						}
					}
				)
			])
		]),
		dangers: Type.Intersect([
			Type.Array(Type.Ref(DelveSiteDomainDangerRow)),
			Type.Tuple([
				Abstract.StaticRowStub({ low: 31, high: 33 }),
				Abstract.StaticRowStub({ low: 34, high: 36 }),
				Abstract.StaticRowStub({ low: 37, high: 39 }),
				Abstract.StaticRowStub({ low: 40, high: 42 }),
				Abstract.StaticRowStub({ low: 43, high: 45 })
			])
		])
	},
	{ $id: '#/$defs/DelveSiteDomain', title: 'Delve site domain' }
)

export type DelveSiteDomain = Static<typeof DelveSiteDomain>
