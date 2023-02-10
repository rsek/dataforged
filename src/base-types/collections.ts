import {
	type Metadata,
	type Localize,
	type Oracles,
	type Assets,
	type Moves,
	type Encounters
} from '@base-types'
import { type Node } from '@base-types/abstract'
import { type RollType } from '@base-types/moves'
import {
	type OracleCollectionColumn,
	type OracleRenderingBase,
	type OracleTableColumn
} from '@base-types/oracles'

export interface Collection<T, IDType = Metadata.ID> extends Node<IDType> {
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

export type OracleCollectionStyle = 'multi_table'

export interface OracleCollectionRendering extends OracleRenderingBase {
	columns: Record<string, OracleCollectionColumn<OracleTableColumn>>
	style?: OracleCollectionStyle | null
}

export type AssetTypeID = string
export interface AssetType extends Collection<Assets.Asset> {}

export type MoveCategoryID = string
export interface MoveCategory
	extends Collection<Moves.Move<RollType>, MoveCategoryID> {}

export type EncounterCollectionID = string
export interface EncounterCollectionClassic
	extends Collection<Encounters.EncounterClassic, EncounterCollectionID> {}
