import {
	type Static,
	Type,
	type ObjectOptions,
	type TProperties
} from '@sinclair/typebox'
import { ID, Localize, Progress, Metadata, Abstract } from './common/index.js'
import { Squash } from './common/utils.js'
import { OracleTableRow } from './oracles.js'
import { JsonEnum, UnionOneOf } from '../../typebox/index.js'

export const DelveSiteDenizenFrequency = JsonEnum(
	['very_common', 'common', 'uncommon', 'rare', 'unforeseen'],
	{ $id: '#/$defs/DelveSiteDenizenFrequency' }
)
export type DelveSiteDenizenFrequency = Static<typeof DelveSiteDenizenFrequency>

export const DelveSiteDenizen = Type.Object(
	{
		id: Type.Ref(ID.DelveSiteDenizenID),
		name: Type.Optional(
			Type.Ref(
				// FIXME i18n keyword doesn't seem to work on Label, or when it's set here. maybe something to do with the parent array being an allOf?
				Localize.Label,
				{}
			)
		),
		min: Type.Integer({ minimum: 1, maximum: 100 }),
		max: Type.Integer({ minimum: 1, maximum: 100 }),
		npc: Type.Optional(
			Type.Ref(ID.NpcID, {
				description: 'The ID of the relevant NPC entry, if one is specified.'
			})
		),
		frequency: Type.Ref(DelveSiteDenizenFrequency)
	},
	{ $id: '#/$defs/DelveSiteDenizen' }
)
export type DelveSiteDenizen = Static<typeof DelveSiteDenizen>

const StaticDenizenRowStub = (
	min: number,
	max: number,
	frequency: DelveSiteDenizenFrequency
) =>
	Squash([
		Abstract.StaticRowStub({ min, max }),
		Type.Object({ frequency: Type.Literal(frequency) })
	])

export const DelveSite = Abstract.SourcedNode(
	Type.Object({
		id: Type.Ref(ID.DelveSiteID),
		icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
		rank: Type.Ref(Progress.ChallengeRank),
		region: Type.Optional(
			Type.Ref(ID.AtlasEntryID, {
				description:
					'The ID of an atlas entry representing the region in which this delve site is located.'
			})
		),
		theme: Type.Ref(ID.DelveSiteThemeID),
		domain: Type.Ref(ID.DelveSiteDomainID),
		extra_card: Type.Optional(
			UnionOneOf(
				[Type.Ref(ID.DelveSiteThemeID), Type.Ref(ID.DelveSiteDomainID)],
				{
					description:
						'An additional theme or domain card, for use with optional rules in Ironsworn: Delve.'
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
	}),
	{
		$id: '#/$defs/DelveSite',
		description: 'A delve site with a theme, domain, and denizen table.'
	}
)

export type DelveSite = Static<typeof DelveSite>

export type DelveSiteCardType = 'theme' | 'domain'
export type DelveSiteCardRowType = 'feature' | 'danger'

const DelveSiteCard = (properties: TProperties, options: ObjectOptions = {}) =>
	Abstract.SourcedNode(
		Type.Object({
			summary: Type.Ref(Localize.MarkdownString),
			description: Type.Optional(Type.Ref(Localize.MarkdownString)),
			icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
			...properties
		}),
		options
	)

export const DelveSiteThemeFeatureRow = Type.Composite(
	[
		Type.Omit(OracleTableRow, ['id', 'min', 'max']),
		Type.Object({
			id: Type.Ref(ID.ThemeFeatureRowID),
			min: Type.Integer(),
			max: Type.Integer()
		})
	],
	{ $id: '#/$defs/DelveSiteThemeFeatureRow' }
)
export type DelveSiteThemeFeatureRow = Static<typeof DelveSiteThemeFeatureRow>
export const DelveSiteThemeDangerRow = Type.Composite(
	[
		Type.Omit(OracleTableRow, ['id', 'min', 'max']),
		Type.Object({
			id: Type.Ref(ID.ThemeDangerRowID),
			min: Type.Integer(),
			max: Type.Integer()
		})
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
				Abstract.StaticRowStub({ min: 1, max: 4 }),
				Abstract.StaticRowStub({ min: 5, max: 8 }),
				Abstract.StaticRowStub({ min: 9, max: 12 }),
				Abstract.StaticRowStub({ min: 13, max: 16 }),
				Abstract.StaticRowStub({ min: 17, max: 20 })
			])
		]),
		dangers: Type.Intersect([
			Type.Array(Type.Ref(DelveSiteThemeDangerRow)),
			Type.Tuple([
				Abstract.StaticRowStub({ min: 1, max: 5 }),
				Abstract.StaticRowStub({ min: 6, max: 10 }),
				Abstract.StaticRowStub({ min: 11, max: 12 }),
				Abstract.StaticRowStub({ min: 13, max: 14 }),
				Abstract.StaticRowStub({ min: 15, max: 16 }),
				Abstract.StaticRowStub({ min: 17, max: 18 }),
				Abstract.StaticRowStub({ min: 19, max: 20 }),
				Abstract.StaticRowStub({ min: 21, max: 22 }),
				Abstract.StaticRowStub({ min: 23, max: 24 }),
				Abstract.StaticRowStub({ min: 25, max: 26 }),
				Abstract.StaticRowStub({ min: 27, max: 28 }),
				Abstract.StaticRowStub({ min: 29, max: 30 })
			])
		])
	},
	{ $id: '#/$defs/DelveSiteTheme', title: 'Delve site theme' }
)
export type DelveSiteTheme = Static<typeof DelveSiteTheme>

export const DelveSiteDomainFeatureRow = Type.Composite(
	[
		Type.Omit(OracleTableRow, ['id', 'min', 'max']),
		Type.Object({
			id: Type.Ref(ID.DomainFeatureRowID),
			min: Type.Integer(),
			max: Type.Integer()
		})
	],
	{ $id: '#/$defs/DelveSiteDomainFeatureRow' }
)
export type DelveSiteDomainFeatureRow = Static<typeof DelveSiteDomainFeatureRow>
export const DelveSiteDomainDangerRow = Type.Composite(
	[
		Type.Omit(OracleTableRow, ['id', 'min', 'max']),
		Type.Object({
			id: Type.Ref(ID.DomainDangerRowID),
			min: Type.Integer(),
			max: Type.Integer()
		})
	],
	{ $id: '#/$defs/DelveSiteDomainDangerRow' }
)
export type DelveSiteDomainDangerRow = Static<typeof DelveSiteDomainDangerRow>
export const DelveSiteDomain = DelveSiteCard(
	{
		id: Type.Ref(ID.DelveSiteDomainID),
		card_type: Type.Literal('domain'),
		name_oracle: Type.Optional(
			Type.Ref(ID.OracleTableID, {
				description:
					'An oracle table ID containing place name elements. For examples, see oracle ID `delve/oracles/site_name/place/barrow`, and its siblings in oracle collection ID `delve/collections/oracles/site_name/place`. These oracles are used by the site name oracle from Ironsworn: Delve (ID: delve/oracles/site_name/format) to create random names for delve sites.'
			})
		),
		features: Type.Intersect([
			Type.Array(Type.Ref(DelveSiteDomainFeatureRow)),
			Type.Tuple([
				Abstract.StaticRowStub({ min: 21, max: 43 }),
				Abstract.StaticRowStub({ min: 44, max: 56 }),
				Abstract.StaticRowStub({ min: 57, max: 64 }),
				Abstract.StaticRowStub({ min: 65, max: 68 }),
				Abstract.StaticRowStub({ min: 69, max: 72 }),
				Abstract.StaticRowStub({ min: 73, max: 76 }),
				Abstract.StaticRowStub({ min: 77, max: 80 }),
				Abstract.StaticRowStub({ min: 81, max: 84 }),
				Abstract.StaticRowStub({ min: 85, max: 88 }),
				Abstract.StaticRowStub(
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
				Abstract.StaticRowStub(
					{ min: 99, max: 99 },
					{
						result: 'You transition into a new theme',
						suggestions: {
							oracles: ['delve/oracles/site_nature/theme']
						}
					}
				),
				Abstract.StaticRowStub(
					{ min: 100, max: 100 },
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
				Abstract.StaticRowStub({ min: 31, max: 33 }),
				Abstract.StaticRowStub({ min: 34, max: 36 }),
				Abstract.StaticRowStub({ min: 37, max: 39 }),
				Abstract.StaticRowStub({ min: 40, max: 42 }),
				Abstract.StaticRowStub({ min: 43, max: 45 })
			])
		])
	},
	{ $id: '#/$defs/DelveSiteDomain', title: 'Delve site domain' }
)

export type DelveSiteDomain = Static<typeof DelveSiteDomain>
