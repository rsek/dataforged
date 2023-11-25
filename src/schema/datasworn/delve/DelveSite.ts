import {
	Type,
	type Static,
	type TObject,
	type TLiteral
} from '@sinclair/typebox'
import { JsonTypeDef } from '../../../json-typedef/symbol.js'
import { toJtdElements } from '../../../json-typedef/utils.js'
import { JsonEnum, UnionOneOf } from '../../../typebox/index.js'
import { Id, Localize, Metadata, Progress } from '../common/index.js'
import { StaticRowPartial } from '../oracles/TableRow.js'
import * as Generic from '../Utils.js'
import * as AssignJs from '../utils/Assign.js'
import * as SourcedNodeJs from '../generic/SourcedNode.js'
import * as IdentifiedNodeJs from '../generic/IdentifiedNode.js'

export const DelveSiteDenizenFrequency = JsonEnum(
	['very_common', 'common', 'uncommon', 'rare', 'unforeseen'],
	{ $id: '#/$defs/DelveSiteDenizenFrequency' }
)
export type DelveSiteDenizenFrequency = Static<typeof DelveSiteDenizenFrequency>

export const DelveSiteDenizen = IdentifiedNodeJs.IdentifiedNode(
	Type.Ref(Id.DelveSiteDenizenId),
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
			Type.Ref(Id.NpcId, {
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
	return AssignJs.Assign(
		[
			StaticRowPartial({ min, max }),
			Type.Object({ frequency: Type.Literal(frequency) })
		],
		{ additionalProperties: true }
	) as TObject<{
		min: TLiteral<Min>
		max: TLiteral<Max>
		frequency: TLiteral<Frequency>
	}>
}
const DelveSiteDenizens = Type.Array(Type.Ref(DelveSiteDenizen))

export const DelveSite = SourcedNodeJs.SourcedNode(
	Type.Ref(Id.DelveSiteId),
	Type.Object({
		icon: Type.Optional(Type.Ref(Metadata.SvgImageUrl)),
		rank: Type.Ref(Progress.ChallengeRank),
		region: Type.Optional(
			Type.Ref(Id.AtlasEntryId, {
				description:
					'The ID of an atlas entry representing the region in which this delve site is located.'
			})
		),
		theme: Type.Ref(Id.DelveSiteThemeId),
		domain: Type.Ref(Id.DelveSiteDomainId),
		extra_card: Type.Optional(
			UnionOneOf(
				[Type.Ref(Id.DelveSiteThemeId), Type.Ref(Id.DelveSiteDomainId)],
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
