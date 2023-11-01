import { Type, type Static } from '@sinclair/typebox'
import { Abstract, ID, Localize, Progress } from 'schema/common'
import { Squash } from 'schema/common/utils'

export const NpcNature = Type.Ref(Localize.Label, {
	description:
		"A localized category label describing the nature of this NPC.\n\nIn Ironsworn classic, this is probably the singular form of the parent collection's name.\n\nFor Starforged, see the table on p. 258 for examples.",
	examples: [
		// classic natures
		'Ironlander',
		'Firstborn',
		'Animal',
		'Beast',
		'Horror',
		'Anomaly',
		// Starforged natures
		'Creature',
		// 'Horror',
		'Human',
		'Machine',
		'Monster',
		'Vehicle'
	],
	$id: '#/$defs/NpcNature'
})
export type NpcNature = Static<typeof NpcNature>

const NpcLike = Type.Object({
	name: Type.Ref(Localize.Label),
	rank: Type.Ref(Progress.ChallengeRank),
	nature: Type.Ref(NpcNature),
	summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
	description: Type.Ref(Localize.MarkdownString)
})

type NpcLike = Static<typeof NpcLike>

export const NpcVariant = Squash(
	[
		NpcLike,
		Type.Object({
			id: Type.Ref(ID.NpcVariantID)
		})
	],
	{
		$id: '#/$defs/NpcVariant'
	}
)
export type NpcVariant = Static<typeof NpcVariant>

export const Npc = Squash(
	[
		Abstract.Cyclopedia({
			id: Type.Ref(ID.NpcID),
			features: Type.Array(Type.Ref(Localize.MarkdownString)),
			drives: Type.Array(Type.Ref(Localize.MarkdownString)),
			tactics: Type.Array(Type.Ref(Localize.MarkdownString)),
			quest_starter: Type.Ref(Localize.MarkdownString),
			variants: Type.Optional(Abstract.Dictionary(Type.Ref(NpcVariant)))
		}),
		NpcLike
	],
	{
		$id: '#/$defs/Npc',
		description:
			'A non-player character entry, similar to those in Chapter 5 of the Ironsworn Rulebook, or Chapter 4 of Starforged.'
	}
)
export type Npc = Static<typeof Npc>

export const NpcCollection = Abstract.Collection(
	Type.Ref(Npc),
	Type.Ref(ID.NpcCollectionID),
	{
		id: Type.Ref(ID.NpcCollectionID)
	},
	{ $id: '#/$defs/NpcCollection' }
)
export type NpcCollection = Static<typeof NpcCollection>
