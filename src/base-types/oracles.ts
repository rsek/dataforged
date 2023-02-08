import { type Node, type Range } from '@base-types/abstract'
import { type Localize, type Metadata } from '@base-types'
import { Icon, Title } from '@base-types/metadata'
import { OracleCollectionStyle } from '@base-types/collections'
import { ExtractKeysOfValueType, PickByType } from '@base-types/utils'

export type OracleTableID = string

export interface OracleTable {
  _id: OracleTableID
  title: Title
  source: Metadata.Source
  summary?: Localize.MarkdownSentences
  description?: Localize.MarkdownParagraphs
  match?: OracleTableMatchBehavior
  table: OracleTableRow[]
  rendering?: OracleTableRendering
  suggestions?: Metadata.Suggestions
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
  style?: OracleTableStyle | OracleCollectionStyle | null
  color?: Metadata.Color
}

export type OracleCollectionColumn<T extends OracleTableColumn> = T & {
  table_key: OracleTableID
}

export interface OracleTableRendering extends OracleRenderingBase {
  icon?: Icon
  style?: OracleTableStyle
  color?: Metadata.Color
}

interface OracleTableColumnBase {
  label?: Localize.Label
  content_type: OracleColumnContentType
}

export interface OracleTableColumnRange extends OracleTableColumnBase {
  content_type: 'range'
}

export interface OracleTableColumnText extends OracleTableColumnBase {
  content_type: Exclude<OracleColumnContentType, 'range'>
}

export type OracleTableColumn = OracleTableColumnRange | OracleTableColumnText

export interface OracleTableMatchBehavior {
  text: Localize.MarkdownSentences
}

export interface OracleStringTemplate
  extends Omit<PickByType<OracleTableRow, string>, NonLocaleStringKeys> {}

type NonLocaleStringKeys = `_${string}` | 'embed_table'

export type OracleTableRowID = string

export interface OracleTableRow<
  Low extends number | null = number | null,
  High extends number | null = number | null,
  ID extends string = OracleTableRowID
> extends Range<Low, High> {
  _id: ID
  result: Localize.MarkdownPhrase
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
