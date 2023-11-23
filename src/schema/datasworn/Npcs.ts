import { Type, type Static } from '@sinclair/typebox'
import { Generic, ID, Localize, Progress } from './common/index.js'

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

const NpcMixin = Type.Composite([
	Generic.CyclopediaMixin,
	Type.Object({
		rank: Type.Ref(Progress.ChallengeRank),
		nature: Type.Ref(NpcNature),
		drives: Type.Array(Type.Ref(Localize.MarkdownString)),
		tactics: Type.Array(Type.Ref(Localize.MarkdownString))
	})
])

export const NpcVariant = Generic.IdentifiedNode(
	Type.Ref(ID.NpcVariantID),
	Type.Pick(NpcMixin, ['name', 'rank', 'nature', 'summary', 'description']),
	{
		$id: '#/$defs/NpcVariant'
	}
)

export type NpcVariant = Static<typeof NpcVariant>

export const Npc = Generic.Collectable(
	Type.Ref(ID.NpcID),
	Type.Composite([
		NpcMixin,
		Type.Object({
			variants: Type.Optional(Generic.Dictionary(Type.Ref(NpcVariant)))
		})
	]),
	{
		$id: '#/$defs/Npc',
		description:
			'A non-player character entry, similar to those in Chapter 5 of the Ironsworn Rulebook, or Chapter 4 of Starforged.'
	}
)

export type Npc = Static<typeof Npc>

export const NpcCollection = Generic.Collection(
	Type.Ref(ID.NpcCollectionID),
	Type.Ref(Npc),
	{
		$id: '#/$defs/NpcCollection'
	}
)
export type NpcCollection = Static<typeof NpcCollection>
export type TNpcCollection = typeof NpcCollection
