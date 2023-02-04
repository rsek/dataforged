import { type JSONSchemaType as Schema } from 'ajv'
import { type Oracles as Types } from 'src/types'

export const ID: Schema<Types.ID> = {
  type: 'string'
  // TODO
}

export const Oracle: Schema<Types.Oracle> = {
  type: 'object',
  required: ['_id', 'name', 'source', 'table'],
  properties: {
    name: { $ref: '#/$defs/Label' },
    source: { $ref: '#/$defs/Metadata.Source' },
    summary: { $ref: '#/$defs/MarkdownSentences' },
    description: { $ref: '#/$defs/MarkdownParagraphs' },
    _id: { $ref: '#/$defs/Oracle.ID' },
    table: {
      type: 'array',
      items: { $ref: '#/$defs/Oracle.TableRow' } as any
    }
  }
}

const Roll: Schema<Types.Roll> = {
  title: 'OracleRoll',
  type: 'object',
  description: 'Parameters for an oracle roll.',
  required: ['oracle'],
  properties: {
    oracle: { $ref: '#/$defs/Oracle.ID' },
    times: {
      description: 'The number of times to roll.',
      type: 'integer',
      min: 1,
      default: 1,
      nullable: true
    },
    method: {
      // TODO description
      type: 'string',
      enum: ['no_duplicates', 'keep_duplicates', 'make_it_worse'],
      default: 'no_duplicates',
      nullable: true
    }
  }
}

export const TableRowID: Schema<Types.TableRowID> = { type: 'string' }

export const TableRow: Schema<Types.TableRow> = {
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
    embed_table: { $ref: '#/$defs/Oracle.TableRow.ID' },
    rolls: {
      type: 'array',
      items: { $ref: '#/$defs/Oracle.TableRoll' }
    } as any,
    suggestions: { $ref: '#/$defs/Suggestions' },
    _id: { $ref: '#/$defs/Oracle.TableRow.ID' }
  }
}
