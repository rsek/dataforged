import {
  type Metadata,
  type Localize,
  type Oracles,
  type Assets,
  type Moves,
  type Encounters
} from '@df-types'
import { type NodeLike } from '@df-types/abstract'
import { OracleCollectionRendering } from '@df-types/oracles'

export interface Collection<T, IDType = Metadata.ID> extends NodeLike<IDType> {
  title: Metadata.Title
  contents: Record<string, T>
  summary?: Localize.MarkdownSentences
  description?: Localize.MarkdownParagraphs
}

export interface RecursiveCollection<T, IDType = Metadata.ID>
  extends Collection<T, IDType> {
  collections?: Record<string, Collection<T, IDType>>
}

export type OracleCollectionID = string
export interface OracleCollection
  extends RecursiveCollection<Oracles.OracleTable, OracleCollectionID> {
  rendering?: OracleCollectionRendering
}

export type AssetTypeID = string
export interface AssetTypeStarforged
  extends Collection<Assets.AssetStarforged> {}
export interface AssetTypeClassic extends Collection<Assets.AssetClassic> {}
export type AssetType = AssetTypeStarforged | AssetTypeClassic

export type MoveCategoryID = string
export interface MoveCategoryStarforged
  extends Collection<Moves.MoveStarforged, MoveCategoryID> {}
export interface MoveCategoryClassic
  extends Collection<Moves.MoveClassic, MoveCategoryID> {}
export type MoveCategory = MoveCategoryStarforged | MoveCategoryClassic

export type EncounterCollectionID = string
export interface EncounterCollectionClassic
  extends Collection<Encounters.EncounterClassic, EncounterCollectionID> {}
