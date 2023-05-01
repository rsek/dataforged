import { Abstract, Localize, Progress } from '@base-types'
import { type Static, Type } from '@sinclair/typebox'
import { DICT_KEY, Collection } from 'base-types/abstract'
import { EncounterCollectionID } from 'base-types/id'

export const EncounterNatureStarforged = Type.String()
export type EncounterNatureStarforged = Static<typeof EncounterNatureStarforged>
export const EncounterNatureClassic = Type.String()
export type EncounterNatureClassic = Static<typeof EncounterNatureClassic>

const EncounterLike = Type.Object({
	name: Localize.Label,
	rank: Progress.ChallengeRank,
	description: Localize.MarkdownString
})

const Encounter = Type.Composite([
	Abstract.Cyclopedia,
	EncounterLike,
	Type.Object({
		drives: Type.Array(Localize.MarkdownString),
		tactics: Type.Array(Localize.MarkdownString),
		quest_starter: Localize.MarkdownString
	})
])

export const EncounterVariantStarforged = Type.Composite([
	EncounterLike,
	Type.Object({
		nature: EncounterNatureStarforged
	})
])

export type EncounterVariantStarforged = Static<
	typeof EncounterVariantStarforged
>

export const EncounterClassic = Type.Composite([
	Encounter,
	Type.Object({ your_truths: Type.Optional(Localize.MarkdownString) })
])

export const EncounterStarforged = Type.Composite([
	Encounter,
	Type.Object({
		summary: Localize.MarkdownString,
		nature: EncounterNatureStarforged,
		variants: Type.Optional(Type.Record(DICT_KEY, EncounterVariantStarforged))
	})
])

export const EncounterCollectionClassic = Type.Composite([
	Collection(EncounterClassic),
	Type.Object({
		id: EncounterCollectionID,
		member_label: Type.Optional(Localize.Label)
	})
])
