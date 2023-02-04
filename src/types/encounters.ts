import { type Localize, type Progress } from 'src/types'
import { type Cyclopedia } from 'src/types/abstract'
import { type MarkdownSentences } from 'src/types/localize'

// TODO
export type EncounterClassicID = string
export type EncounterStarforgedID = string

export type EncounterNatureStarforged = string
export type EncounterNatureClassic = string

interface EncounterLike {
  rank: Progress.ChallengeRank
  nature: string
  description: Localize.MarkdownParagraph
}
interface Encounter extends EncounterLike, Cyclopedia<string> {
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
  your_truths?: MarkdownSentences
}

export interface EncounterStarforged extends Encounter {
  summary: MarkdownSentences
  nature: EncounterNatureStarforged
  variants?: Record<string, EncounterVariantStarforged>
}
