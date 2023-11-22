import {
	Type,
	type Static,
	type TObject,
	type TLiteral
} from '@sinclair/typebox'
import { JsonTypeDef } from '../../json-typedef/symbol.js'
import { toJtdElements } from '../../json-typedef/utils.js'
import { JsonEnum, UnionOneOf } from '../../typebox/index.js'
import { Generic, ID, Localize, Metadata, Progress } from './common/index.js'
import { Merge } from './utils/typebox.js'
import { StaticRowPartial, TableRow } from './oracles/TableRow.js'
import { DelveSiteThemeID } from './index.js'

export const DelveSiteDenizenFrequency = JsonEnum(
	['very_common', 'common', 'uncommon', 'rare', 'unforeseen'],
	{ $id: '#/$defs/DelveSiteDenizenFrequency' }
)
export type DelveSiteDenizenFrequency = Static<typeof DelveSiteDenizenFrequency>

export const DelveSiteDenizen = Generic.IdentifiedNode(
	Type.Ref(ID.DelveSiteDenizenID),
	Type.Object({
		name: Type.Optional(
			Type.Ref(
				// FIXME i18n keyword doesn't seem to work on Label, or when it's set here. maybe something to do with the parent array being an allOf?
				Localize.Label,
				{}
			)
		),
		min: Type.Integer(),
		max: Type.Integer(),
		npc: Type.Optional(
			Type.Ref(ID.NpcID, {
				description: 'The ID of the relevant NPC entry, if one is specified.'
			})
		),
		frequency: Type.Ref(DelveSiteDenizenFrequency)
	}),
	{ $id: '#/$defs/DelveSiteDenizen' }
)
export type DelveSiteDenizen = Static<typeof DelveSiteDenizen>

function StaticDenizenRowStub<
	Min extends number,
	Max extends number,
	Frequency extends DelveSiteDenizenFrequency
>(min: Min, max: Max, frequency: Frequency) {
	return Merge(
		StaticRowPartial({ min, max }),
		Type.Object({ frequency: Type.Literal(frequency) }),
		{ additionalProperties: true }
	) as TObject<{
		min: TLiteral<Min>
		max: TLiteral<Max>
		frequency: TLiteral<Frequency>
	}>
}

const DelveSiteDenizens = Type.Array(Type.Ref(DelveSiteDenizen))

export const DelveSite = Generic.SourcedNode(
	Type.Ref(ID.DelveSiteID),
	Type.Object({
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
						'An additional theme or domain card ID, for use with optional rules in Ironsworn: Delve.',
					[JsonTypeDef]: { schema: { type: 'string' } }
				}
			)
		),
		description: Type.Ref(Localize.MarkdownString),
		denizens: Type.Intersect(
			[
				DelveSiteDenizens,
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
			],
			{
				[JsonTypeDef]: {
					schema: toJtdElements(DelveSiteDenizens)
				}
			}
		)
	}),
	{
		$id: '#/$defs/DelveSite',
		description: 'A delve site with a theme, domain, and denizen table.'
	}
)

export type DelveSite = Static<typeof DelveSite>
export type TDelveSite = typeof DelveSite

export type DelveSiteCardType = 'theme' | 'domain'
export type DelveSiteCardRowType = 'feature' | 'danger'

const DelveCardMixin = Type.Object({
	summary: Type.Ref(Localize.MarkdownString),
	description: Type.Optional(Type.Ref(Localize.MarkdownString)),
	icon: Type.Optional(Type.Ref(Metadata.SVGImageURL))
})

export const DelveSiteThemeFeatureRow = Generic.IdentifiedNode(
	Type.Ref(ID.ThemeFeatureRowID),
	TableRow({
		min: Type.Integer(),
		max: Type.Integer()
	}),
	{ $id: '#/$defs/DelveSiteThemeFeatureRow' }
)
export type DelveSiteThemeFeatureRow = Static<typeof DelveSiteThemeFeatureRow>

export const DelveSiteThemeDangerRow = Generic.IdentifiedNode(
	Type.Ref(ID.ThemeDangerRowID),
	TableRow({
		min: Type.Integer(),
		max: Type.Integer()
	}),
	{ $id: '#/$defs/DelveSiteThemeDangerRow' }
)

const DelveSiteThemeFeatures = Type.Array(Type.Ref(DelveSiteThemeFeatureRow))
const DelveSiteThemeDangers = Type.Array(Type.Ref(DelveSiteThemeDangerRow))

export type DelveSiteThemeDangerRow = Static<typeof DelveSiteThemeDangerRow>
export const DelveSiteTheme = Generic.SourcedNode(
	Type.Ref(DelveSiteThemeID),
	Merge(
		DelveCardMixin,
		Type.Object({
			card_type: Type.Literal('theme'),
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
		})
	),
	{
		$id: '#/$defs/DelveSiteTheme'
	}
)
export type DelveSiteTheme = Static<typeof DelveSiteTheme>
export type TDelveSiteTheme = typeof DelveSiteTheme

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
	Merge(
		DelveCardMixin,
		Type.Object({
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
		})
	),
	{
		$id: '#/$defs/DelveSiteDomain'
	}
)
// console.log(DelveSiteDomainPartial)
// console.log(DelveSiteDomain)

export type DelveSiteDomain = Static<typeof DelveSiteDomain>
export type TDelveSiteDomain = typeof DelveSiteDomain
