import { type Node, type Range } from 'src/types/abstract'
import { type Localize, type Metadata } from 'src/types'

export type OracleTableID = string

export interface OracleTable extends Node<OracleTableID> {
  _id: OracleTableID
  name: Localize.Label
  source: Metadata.Source
  summary?: Localize.MarkdownSentences
  description?: Localize.MarkdownParagraphs
  table: OracleTableRow[]
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
