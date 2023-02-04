import { type Node, type Range } from 'src/types/abstract'
import { type Localized, type Metadata } from 'src/types'

export type ID = string

export interface Oracle extends Node<ID> {
  _id: ID
  name: Localized.Label
  source: Metadata.Source
  summary?: Localized.MarkdownSentences
  description?: Localized.MarkdownParagraphs
  table: TableRow
}

export type TableRowID = string

export interface TableRow extends Range {
  _id: TableRowID
  result: Localized.MarkdownPhrase
  summary?: Localized.MarkdownSentences
  rolls?: Roll[]
  suggestions?: Metadata.Suggestions
}

export interface Roll {
  oracle: ID
  times: number
  method: 'no_duplicates' | 'keep_duplicates' | 'make_it_worse'
}
