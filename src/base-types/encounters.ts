import { type Static, Type } from '@sinclair/typebox'
import * as Common from 'base-types/common'
import * as Localize from 'base-types/localize'
import * as Progress from 'base-types/progress'
import * as ID from 'base-types/id'

export const EncounterNatureStarforged = Type.String({
	examples: ['creature', 'horror', 'human', 'machine', 'monster', 'vehicle']
})
export type EncounterNatureStarforged = Static<typeof EncounterNatureStarforged>

const EncounterLike = Type.Object({
	name: Type.Ref(Localize.Label),
	rank: Progress.ChallengeRank,
	description: Localize.MarkdownString
})

const EncounterBase = Type.Composite([
	Common.Cyclopedia,
	EncounterLike,
	Type.Object({
		drives: Type.Array(Localize.MarkdownString),
		tactics: Type.Array(Localize.MarkdownString),
		quest_starter: Localize.MarkdownString
	})
])

export const EncounterVariantStarforged = Type.Composite(
	[
		EncounterLike,
		Type.Object({
			id: Type.Ref(ID.EncounterStarforgedID),
			nature: EncounterNatureStarforged
		})
	],
	{ $id: '#/$defs/EncounterVariantStarforged' }
)
export type EncounterVariantStarforged = Static<
	typeof EncounterVariantStarforged
>

export const EncounterClassic = Type.Composite(
	[
		EncounterBase,
		Type.Object({
			id: Type.Ref(ID.EncounterClassicID),
			your_truths: Type.Optional(Type.Ref(Localize.MarkdownString))
		})
	],
	{ $id: '#/$defs/EncounterClassic' }
)

export const EncounterStarforged = Type.Composite(
	[
		EncounterBase,
		Type.Object({
			id: Type.Ref(ID.EncounterStarforgedID),
			summary: Localize.MarkdownString,
			nature: EncounterNatureStarforged,
			variants: Type.Optional(Common.Dictionary(EncounterVariantStarforged))
		})
	],
	{ $id: '#/$defs/EncounterStarforged' }
)
export type EncounterStarforged = Static<typeof EncounterStarforged>

export const EncounterCollectionClassic = Type.Composite(
	[
		Common.Collection(EncounterClassic, ID.EncounterCollectionID),
		Type.Object({
			id: Type.Ref(ID.EncounterCollectionID),
			member_label: Type.Optional(Type.Ref(Localize.Label))
		})
	],
	{ $id: '#/$defs/EncounterCollectionClassic' }
)
export type EncounterCollectionClassic = Static<
	typeof EncounterCollectionClassic
>
