import { type JSONSchemaType as Schema } from 'ajv'
import { type Oracles as Types } from 'src/types'

export const OracleTableID: Schema<Types.OracleTableID> = {
  type: 'string',
  $comment: '{namespace}/oracles/{*}/{oracle}'
  // TODO
}

export const OracleTable: Schema<Types.OracleTable> = {
  type: 'object',
  required: ['_id', 'name', 'source', 'table'],
  properties: {
    name: { $ref: '#/$defs/Label' },
    source: { $ref: '#/$defs/Source' },
    summary: { $ref: '#/$defs/MarkdownSentences' },
    description: { $ref: '#/$defs/MarkdownParagraphs' },
    _id: { $ref: '#/$defs/OracleTableID' },
    table: {
      type: 'array',
      items: { $ref: '#/$defs/TableRow' } as any
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
      type: 'integer',
      min: 1,
      default: 1,
      nullable: true
    },
    method: {
      description: `
      no_duplicates = Reroll duplicate OracleTableRows
      allow_duplicates = Don't reroll duplicate OracleTableRows
      make_it_worse = Don't reroll duplicate OracleTableRows; duplicates compound
      `,
      type: 'string',
      enum: ['no_duplicates', 'keep_duplicates', 'make_it_worse'],
      default: 'no_duplicates',
      nullable: true
    }
  }
}

export const TableRowID: Schema<Types.OracleTableRowID> = {
  type: 'string',
  $comment: '{namespace}/oracles/{*}/{oracle}/{low}-{high}'
}

export const TableRow: Schema<Types.OracleTableRow> = {
  type: 'object',
  description: 'Represents a row from an oracle table.',
  required: ['_id', 'low', 'high', 'result'],
  properties: {
    low: {
      description: "The low end of this row's range",
      minimum: 1,
      maximum: 100,
      type: 'integer'
    },
    high: {
      description: "The high end of this row's range",
      minimum: 1,
      maximum: 100,
      type: 'integer'
    },
    result: { $ref: '#/$defs/MarkdownPhrase' },
    summary: { $ref: '#/$defs/MarkdownSentences' },
    embed_table: { $ref: '#/$defs/TableRowID' },
    rolls: {
      type: 'array',
      items: { $ref: '#/$defs/OracleTableRoll' }
    } as any,
    suggestions: { $ref: '#/$defs/Suggestions' },
    _id: { $ref: '#/$defs/TableRowID' }
  }
}
