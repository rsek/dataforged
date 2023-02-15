import {
	type Encounters,
	type Abstract,
	type Localize,
	type Progress
} from '@base-types'
import { type Collection } from 'base-types/abstract'

// TODO
export type EncounterClassicID = string
export type EncounterStarforgedID = string
export type EncounterID = EncounterClassicID | EncounterStarforgedID

export type EncounterNatureStarforged = string
export type EncounterNatureClassic = string

interface EncounterLike {
	rank: Progress.ChallengeRank
	nature: string
	description: Localize.MarkdownParagraph
}
interface Encounter extends EncounterLike, Abstract.Cyclopedia<string> {
	drives: Localize.MarkdownPhrase[]
	tactics: Localize.MarkdownPhrase[]
	quest_starter: Localize.MarkdownParagraph
}
// TODO: Might make more sense as an ExtendOne

export interface EncounterVariantStarforged extends EncounterLike {
	nature: EncounterNatureStarforged
}

export interface EncounterClassic extends Omit<Encounter, 'summary'> {
	nature: EncounterNatureClassic
	your_truths?: Localize.MarkdownSentences
}

export interface EncounterStarforged extends Encounter {
	summary: Localize.MarkdownSentences
	nature: EncounterNatureStarforged
	variants?: Record<string, EncounterVariantStarforged>
}

export type EncounterCollectionID = string
export interface EncounterCollectionClassic
	extends Collection<Encounters.EncounterClassic, EncounterCollectionID> {}
