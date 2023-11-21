import {
	type Static,
	Type,
	type ObjectOptions,
	type TProperties
} from '@sinclair/typebox'
import { ID, Localize, Progress, Metadata, Generic } from './common/index.js'
import { OracleTableRow } from './oracles.js'
import { JsonEnum, UnionOneOf } from '../../typebox/index.js'
import { toJtdElements } from '../../json-typedef/utils.js'
import { JsonTypeDef } from '../../json-typedef/symbol.js'
import { type CanBeLiteral, Merge, ObjectLiterals } from './utils/typebox.js'
import { WithDefaults } from './utils/typebox.js'

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

function StaticDenizenRowStub(
	min: number,
	max: number,
	frequency: DelveSiteDenizenFrequency
) {
	return Merge(
		StaticRowStub({ min, max }),
		Type.Object({ frequency: Type.Literal(frequency) })
	)
}

export const DelveSite = Generic.SourcedNode(
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
						'An additional theme or domain card ID, for use with optional rules in Ironsworn: Delve.',
					[JsonTypeDef]: { schema: { type: 'string' } }
				}
			)
		),
		description: Type.Ref(Localize.MarkdownString),
		denizens: Type.Intersect(
			[
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
			],
			{
				[JsonTypeDef]: {
					schema: toJtdElements(Type.Array(Type.Ref(DelveSiteDenizen)))
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

const DelveCardMixin = Generic.SourcedNode(
	Type.Object({
		summary: Type.Ref(Localize.MarkdownString),
		description: Type.Optional(Type.Ref(Localize.MarkdownString)),
		icon: Type.Optional(Type.Ref(Metadata.SVGImageURL))
	})
)

export const DelveSiteThemeFeatureRow = Merge(
	OracleTableRow,
	Type.Object({
		id: Type.Ref(ID.ThemeFeatureRowID),
		min: Type.Integer(),
		max: Type.Integer()
	}),
	{ $id: '#/$defs/DelveSiteThemeFeatureRow' }
)
export type DelveSiteThemeFeatureRow = Static<typeof DelveSiteThemeFeatureRow>
export const DelveSiteThemeDangerRow = Merge(
	OracleTableRow,
	Type.Object({
		id: Type.Ref(ID.ThemeDangerRowID),
		min: Type.Integer(),
		max: Type.Integer()
	}),
	{ $id: '#/$defs/DelveSiteThemeDangerRow' }
)
export type DelveSiteThemeDangerRow = Static<typeof DelveSiteThemeDangerRow>
export const DelveSiteTheme = Merge(
	DelveCardMixin,
	Type.Object({
		id: Type.Ref(ID.DelveSiteThemeID),
		card_type: Type.Literal('theme'),
		features: Type.Intersect(
			[
				Type.Array(Type.Ref(DelveSiteThemeFeatureRow)),
				Type.Tuple([
					StaticRowStub({ min: 1, max: 4 }),
					StaticRowStub({ min: 5, max: 8 }),
					StaticRowStub({ min: 9, max: 12 }),
					StaticRowStub({ min: 13, max: 16 }),
					StaticRowStub({ min: 17, max: 20 })
				])
			],
			{
				[JsonTypeDef]: {
					schema: toJtdElements(Type.Array(Type.Ref(DelveSiteThemeFeatureRow)))
				}
			}
		),
		dangers: Type.Intersect(
			[
				Type.Array(Type.Ref(DelveSiteThemeDangerRow)),
				Type.Tuple([
					StaticRowStub({ min: 1, max: 5 }),
					StaticRowStub({ min: 6, max: 10 }),
					StaticRowStub({ min: 11, max: 12 }),
					StaticRowStub({ min: 13, max: 14 }),
					StaticRowStub({ min: 15, max: 16 }),
					StaticRowStub({ min: 17, max: 18 }),
					StaticRowStub({ min: 19, max: 20 }),
					StaticRowStub({ min: 21, max: 22 }),
					StaticRowStub({ min: 23, max: 24 }),
					StaticRowStub({ min: 25, max: 26 }),
					StaticRowStub({ min: 27, max: 28 }),
					StaticRowStub({ min: 29, max: 30 })
				])
			],
			{
				[JsonTypeDef]: {
					schema: toJtdElements(Type.Array(Type.Ref(DelveSiteThemeDangerRow)))
				}
			}
		)
	}),
	{ $id: '#/$defs/DelveSiteTheme' }
)
export type DelveSiteTheme = Static<typeof DelveSiteTheme>
export type TDelveSiteTheme = typeof DelveSiteTheme

export const DelveSiteDomainFeatureRow = Merge(
	OracleTableRow,
	Type.Object({
		id: Type.Ref(ID.DomainFeatureRowID),
		min: Type.Integer(),
		max: Type.Integer()
	}),
	{ $id: '#/$defs/DelveSiteDomainFeatureRow' }
)
export type DelveSiteDomainFeatureRow = Static<typeof DelveSiteDomainFeatureRow>
export const DelveSiteDomainDangerRow = Merge(
	OracleTableRow,
	Type.Object({
		id: Type.Ref(ID.DomainDangerRowID),
		min: Type.Integer(),
		max: Type.Integer()
	}),
	{ $id: '#/$defs/DelveSiteDomainDangerRow' }
)
export type DelveSiteDomainDangerRow = Static<typeof DelveSiteDomainDangerRow>
export const DelveSiteDomain = Merge(
	DelveCardMixin,
	Type.Object({
		id: Type.Ref(ID.DelveSiteDomainID),
		card_type: Type.Literal('domain'),
		name_oracle: Type.Optional(
			Type.Ref(ID.OracleTableID, {
				description:
					'An oracle table ID containing place name elements. For examples, see oracle ID `delve/oracles/site_name/place/barrow`, and its siblings in oracle collection ID `delve/collections/oracles/site_name/place`. These oracles are used by the site name oracle from Ironsworn: Delve (ID: delve/oracles/site_name/format) to create random names for delve sites.'
			})
		),
		features: Type.Intersect(
			[
				Type.Array(Type.Ref(DelveSiteDomainFeatureRow)),
				Type.Tuple([
					StaticRowStub({ min: 21, max: 43 }),
					StaticRowStub({ min: 44, max: 56 }),
					StaticRowStub({ min: 57, max: 64 }),
					StaticRowStub({ min: 65, max: 68 }),
					StaticRowStub({ min: 69, max: 72 }),
					StaticRowStub({ min: 73, max: 76 }),
					StaticRowStub({ min: 77, max: 80 }),
					StaticRowStub({ min: 81, max: 84 }),
					StaticRowStub({ min: 85, max: 88 }),
					StaticRowStub(
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
					StaticRowStub(
						{ min: 99, max: 99 },
						{
							result: 'You transition into a new theme',
							suggestions: {
								oracles: ['delve/oracles/site_nature/theme']
							}
						}
					),
					StaticRowStub(
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
					schema: toJtdElements(Type.Array(Type.Ref(DelveSiteDomainFeatureRow)))
				}
			}
		),
		dangers: Type.Intersect(
			[
				Type.Array(Type.Ref(DelveSiteDomainDangerRow)),
				Type.Tuple([
					StaticRowStub({ min: 31, max: 33 }),
					StaticRowStub({ min: 34, max: 36 }),
					StaticRowStub({ min: 37, max: 39 }),
					StaticRowStub({ min: 40, max: 42 }),
					StaticRowStub({ min: 43, max: 45 })
				])
			],
			{
				[JsonTypeDef]: {
					schema: toJtdElements(Type.Array(Type.Ref(DelveSiteDomainDangerRow)))
				}
			}
		)
	}),
	{ $id: '#/$defs/DelveSiteDomain' }
)

export type DelveSiteDomain = Static<typeof DelveSiteDomain>
export type TDelveSiteDomain = typeof DelveSiteDomain

function StaticRowStub(
	literals: Partial<CanBeLiteral<OracleTableRow>> & {
		min?: number
		max?: number
	},
	defaults: Partial<
		OracleTableRow & {
			min?: number
			max?: number
		}
	> = {}
) {
	const result = WithDefaults(ObjectLiterals(literals), defaults)
	return result
}
