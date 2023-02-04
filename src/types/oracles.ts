import { type Node, type Range } from 'src/types/abstract'
import { type Localize, type Metadata } from 'src/types'

export type OracleTableID = string

export interface Oracle extends Node<OracleTableID> {
  _id: OracleTableID
  name: Localize.Label
  source: Metadata.Source
  summary?: Localize.MarkdownSentences
  description?: Localize.MarkdownParagraphs
  table: TableRow[]
}

export type TableRowID = string

export interface TableRow extends Range {
  _id: TableRowID
  result: Localize.MarkdownPhrase
  summary?: Localize.MarkdownSentences
  rolls?: OracleTableRoll[]
  suggestions?: Metadata.Suggestions
  embed_table?: TableRowID
}

export interface OracleTableRoll {
  oracle: OracleTableID
  times?: number
  method?: 'no_duplicates' | 'keep_duplicates' | 'make_it_worse'
}
