import {
	type Metadata,
	type Localize,
	type Oracles,
	type Assets,
	type Moves,
	type Encounters,
	type Abstract
} from '@base-types'

export interface Collection<T, IDType = Metadata.ID>
	extends Abstract.Node<IDType> {
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

export interface OracleCollectionRendering extends Oracles.OracleRenderingBase {
	color?: string
	columns: Record<
		string,
		Oracles.OracleCollectionColumn<Oracles.OracleTableColumn>
	>
	style?: OracleCollectionStyle | null
}

export type AssetTypeID = string
export interface AssetType extends Collection<Assets.Asset> {}

export type MoveCategoryID = string
export interface MoveCategory
	extends Collection<Moves.Move<Moves.RollType>, MoveCategoryID> {}

export type EncounterCollectionID = string
export interface EncounterCollectionClassic
	extends Collection<Encounters.EncounterClassic, EncounterCollectionID> {}
