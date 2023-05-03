import { Abstract, Localize, Progress } from '@base-types'
import { type Static, Type } from '@sinclair/typebox'
import { DICT_KEY, Collection } from 'base-types/abstract'
import {
	EncounterClassicID,
	EncounterCollectionID,
	EncounterStarforgedID
} from 'base-types/id'

export const EncounterNatureStarforged = Type.String({ examples: [] })
export type EncounterNatureStarforged = Static<typeof EncounterNatureStarforged>
export const EncounterNatureClassic = Type.String({ examples: [] })
export type EncounterNatureClassic = Static<typeof EncounterNatureClassic>

const EncounterLike = Type.Object({
	name: Localize.Label,
	rank: Progress.ChallengeRank,
	description: Localize.MarkdownString
})

const EncounterBase = Type.Composite([
	Abstract.Cyclopedia,
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
			id: EncounterStarforgedID,
			nature: EncounterNatureStarforged
		})
	],
	{ $id: 'EncounterVariantStarforged' }
)
export type EncounterVariantStarforged = Static<
	typeof EncounterVariantStarforged
>

export const EncounterClassic = Type.Composite(
	[
		EncounterBase,
		Type.Object({
			id: EncounterClassicID,
			your_truths: Type.Optional(Localize.MarkdownString)
		})
	],
	{ $id: 'EncounterClassic' }
)

export const EncounterStarforged = Type.Composite(
	[
		EncounterBase,
		Type.Object({
			id: EncounterStarforgedID,
			summary: Localize.MarkdownString,
			nature: EncounterNatureStarforged,
			variants: Type.Optional(Type.Record(DICT_KEY, EncounterVariantStarforged))
		})
	],
	{ $id: 'EncounterStarforged' }
)

export const EncounterCollectionClassic = Type.Composite(
	[
		Collection(EncounterClassic, EncounterCollectionID),
		Type.Object({
			id: EncounterCollectionID,
			member_label: Type.Optional(Localize.Label)
		})
	],
	{ $id: 'EncounterCollectionClassic' }
)
export type EncounterCollectionClassic = Static<
	typeof EncounterCollectionClassic
>
