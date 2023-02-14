import {
	type Localize,
	type Metadata,
	type Utils,
	type Abstract,
	type Collections
} from '@base-types'
export type OracleTableID = string

export interface OracleTable {
	_id: OracleTableID
	title: Metadata.Title
	source: Metadata.Source
	summary?: Localize.MarkdownSentences
	description?: Localize.MarkdownParagraphs
	match?: OracleTableMatchBehavior
	table: OracleTableRow[]
	rendering?: OracleTableRendering
	suggestions?: Metadata.SuggestionsBase
}

export type OracleTableStyle = 'table' | 'embed_in_row' | 'embed_as_column'
export type OracleColumnContentType =
	| 'range'
	| 'result'
	| 'summary'
	| 'description'

export interface OracleRenderingBase {
	/**
	 * Describes the rendering of this oracle as a standalone table.
	 */
	columns?: Record<string, OracleTableColumn>
	style?: OracleTableStyle | Collections.OracleCollectionStyle | null
	color?: Metadata.Color
}

export type OracleCollectionColumn<
	T extends OracleTableColumn = OracleTableColumn
> = T & {
	table_key: OracleTableID
}

export interface OracleTableRendering extends OracleRenderingBase {
	icon?: Metadata.Icon
	style?: OracleTableStyle
	color?: Metadata.Color
}

export interface OracleTableColumn {
	label?: Localize.Label
	content_type: OracleColumnContentType
}

export interface OracleTableMatchBehavior {
	text: Localize.MarkdownSentences
}

export interface OracleStringTemplate
	extends Omit<Utils.PickByType<OracleTableRow, string>, NonLocaleStringKeys> {}

type NonLocaleStringKeys = `_${string}` | 'embed_table'

export type OracleTableRowID = string

export interface OracleTableRow<
	Low extends number | null = number | null,
	High extends number | null = number | null,
	ID extends string = OracleTableRowID
> extends Abstract.Range<Low, High> {
	_id: ID
	low: Low
	high: High
	result: Localize.MarkdownPhrase
	summary?: Localize.MarkdownSentences
	rolls?: OracleTableRoll[]
	suggestions?: Metadata.SuggestionsBase
	embed_table?: OracleTableRowID
}

export type OracleTableRollMethod =
	| 'no_duplicates'
	| 'keep_duplicates'
	| 'make_it_worse'

export interface OracleTableRoll<
	ID extends string = OracleTableID,
	Times extends number | undefined = number | undefined,
	Method extends OracleTableRollMethod = OracleTableRollMethod
> {
	oracle?: ID | null
	times?: Times
	method?: Method
}
