import { type JSONSchemaType as Schema } from 'ajv'
import { type Oracles as Types } from 'src/types'

export const OracleTableID: Schema<Types.OracleTableID> = {
  type: 'string',
  $comment: '{namespace}/oracles/{*}/{oracle}'
}

export const OracleTable: Schema<Types.OracleTable> = {
  type: 'object',
  required: ['_id', 'name', 'source', 'table'],
  properties: {
    _id: { $ref: '#/$defs/OracleTableID' },
    name: { $ref: '#/$defs/Label' },
    source: { $ref: '#/$defs/Source' },
    summary: { $ref: '#/$defs/MarkdownSentences' },
    description: { $ref: '#/$defs/MarkdownParagraphs' },
    match: {
      title: 'Oracle match behavior',
      description: 'A handful of oracles have special behavior of a match.',
      type: 'object',
      required: ['text'],
      properties: { text: { $ref: '#/$defs/MarkdownSentences' } }
    } as any,
    table: {
      type: 'array',
      items: { $ref: '#/$defs/OracleTableRow' } as any
    }
  }
}

export const OracleTableRoll: Schema<Types.OracleTableRoll> = {
  title: 'OracleRoll',
  type: 'object',
  description: 'Parameters for an oracle roll.',
  required: ['oracle'],
  properties: {
    oracle: { $ref: '#/$defs/OracleTableID' },
    times: {
      description: 'The number of times to roll.',
      type: ['integer', 'null'],
      min: 1,
      default: 1
    } as any,
    method: {
      title: 'Oracle roll method',
      description: `
      no_duplicates = Reroll duplicate OracleTableRows
      allow_duplicates = Don't reroll duplicate OracleTableRows
      make_it_worse = Don't reroll duplicate OracleTableRows; duplicates compound
      `,
      type: ['string', 'null'],
      enum: ['no_duplicates', 'keep_duplicates', 'make_it_worse'],
      default: 'no_duplicates'
    } as any
  }
}

export const OracleTableRowID: Schema<Types.OracleTableRowID> = {
  type: 'string',
  $comment: '{namespace}/oracles/{*}/{oracle}/{low}-{high}'
}

export const OracleTableRow: Schema<Types.OracleTableRow> = {
  type: 'object',
  description: 'Represents a row from an oracle table.',
  required: ['_id', 'low', 'high', 'result'],
  properties: {
    low: {
      description: "The low end of this row's roll range",
      minimum: 1,
      maximum: 100,
      type: ['integer', 'null']
    } as any,
    high: {
      description: "The high end of this row's roll range",
      minimum: 1,
      maximum: 100,
      type: ['integer', 'null']
    } as any,
    result: {
      $ref: '#/$defs/MarkdownPhrase'
    },
    summary: {
      description:
        "A secondary markdown string that must be presented to the user for the implementation to be complete, but may benefit from progressive disclosure (such as a collapsible element, popover/tooltip, etc).\n\n`null` is used in cases where an 'empty' `OracleTableRow.summary` exists (example: Starship Type, p. 326). In the book, these table cells are rendered with the text `--` (and this is the recommended placeholder for tabular display). For display as a single result (e.g. VTT roll output), however, `null` values can be safely omitted.",
      anyOf: [{ $ref: '#/$defs/MarkdownSentences' }, { type: 'null' }]
    } as any,
    embed_table: { $ref: '#/$defs/OracleTableID' },
    rolls: {
      type: 'array',
      items: { $ref: '#/$defs/OracleTableRoll' }
    } as any,
    suggestions: { $ref: '#/$defs/Suggestions' },
    _id: { $ref: '#/$defs/OracleTableRowID' }
  }
}
