import {
  type Metadata,
  type Localize,
  type Oracles,
  type Assets,
  type Moves,
  type Encounters
} from 'src/types'
import { type NodeLike } from 'src/types/abstract'

export interface Collection<T, IDType = Metadata.ID> extends NodeLike<IDType> {
  title: Metadata.Title
  contents: Record<string, T>
  summary?: Localize.MarkdownSentences
  description?: Localize.MarkdownParagraphs
}

export interface RecursiveCollection<T, IDType = Metadata.ID>
  extends Collection<T, IDType> {
  collections: Record<string, Collection<T, IDType>>
}

export type OracleCollectionID = string
export interface OracleCollection
  extends RecursiveCollection<Oracles.Oracle, OracleCollectionID> {}

export type AssetTypeID = string
export interface AssetType<T extends Metadata.Ruleset>
  extends Collection<Assets.Asset<T>> {}

export type MoveCategoryID = string
export interface MoveCategory<T extends Metadata.Ruleset>
  extends Collection<Moves.Move<T>, MoveCategoryID> {}

export type EncounterCollectionID = string
export interface EncounterCollection
  extends Collection<Encounters.EncounterClassic, EncounterCollectionID> {}
