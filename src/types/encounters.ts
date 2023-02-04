import { type Localize, type Progress } from 'src/types'
import { type Cyclopedia } from 'src/types/abstract'

// TODO
export type ID = string

export type NatureStarforged = string
export type NatureClassic = string

interface EncounterLike {
  rank: Progress.ChallengeRank
  nature: string
  description: Localize.MarkdownParagraph
}
interface Encounter extends EncounterLike, Cyclopedia<string> {
  drives: Localize.MarkdownPhrase[]
  tactics: Localize.MarkdownPhrase[]
}
// TODO: Might make more sense as an ExtendOne

export interface VariantStarforged extends EncounterLike {}

export interface EncounterClassic extends Encounter {
  nature: NatureClassic
}

export interface EncounterStarforged extends Encounter {
  nature: NatureStarforged
  variants?: Record<string, VariantStarforged>
}
