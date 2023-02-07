import { type Node, type Range } from '@df-types/abstract'
import { type Localize, type Metadata } from '@df-types'

export type OracleTableID = string

export interface OracleTable extends Node<OracleTableID> {
  _id: OracleTableID
  name: Localize.Label
  source: Metadata.Source
  summary?: Localize.MarkdownSentences
  description?: Localize.MarkdownParagraphs
  match?: OracleTableMatchBehavior
  table: OracleTableRow[]
  rendering?: OracleTableRendering
  suggestions?: Metadata.Suggestions
}

type OracleTableStyle =
  | 'table'
  | 'embed_in_row'
  | 'embed_as_column'
  | 'multi_table'
type OracleColumnContent = 'range' | 'result' | 'summary' | 'description'

interface OracleRenderingBase {
  /**
   * Describes the rendering of this oracle as a standalone table.
   */
  columns: Record<string, OracleTableColumn>
  style: OracleTableStyle
}

export type OracleCollectionColumn<T extends OracleTableColumn> = T & {
  content_source: OracleTableID
  // alt: point at a key?
}

export interface OracleCollectionRendering extends OracleRenderingBase {
  style: 'multi_table'
}

export interface OracleTableRendering extends OracleRenderingBase {
  style: Exclude<OracleTableStyle, 'multi_table'>
}

interface OracleTableColumnBase {
  label?: Localize.Label
  content_type: OracleColumnContent
}

export interface OracleTableColumnRange extends OracleTableColumnBase {
  content_type: 'range'
}

export interface OracleTableColumnText extends OracleTableColumnBase {
  content_type: Exclude<OracleColumnContent, 'range'>
}

export type OracleTableColumn = OracleTableColumnRange | OracleTableColumnText

export interface OracleTableMatchBehavior {
  text: Localize.MarkdownSentences
}

export type OracleTableRowID = string

export interface OracleTableRow<
  Low extends number | null = number | null,
  High extends number | null = number | null,
  Result extends string = Localize.MarkdownPhrase,
  ID extends string = OracleTableRowID
> extends Range<Low, High> {
  _id: ID
  result: Result
  summary?: Localize.MarkdownSentences
  rolls?: OracleTableRoll[]
  suggestions?: Metadata.Suggestions
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
  oracle: ID
  times?: Times
  method?: Method
}
