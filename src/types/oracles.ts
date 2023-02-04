import { type Node, type Range } from 'src/types/abstract'
import { type Localize, type Metadata } from 'src/types'

export type ID = string

export interface Oracle extends Node<ID> {
  _id: ID
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
  rolls?: Roll[]
  suggestions?: Metadata.Suggestions
  embed_table?: TableRowID
}

export interface Roll {
  oracle: ID
  times?: number
  method?: 'no_duplicates' | 'keep_duplicates' | 'make_it_worse'
}
