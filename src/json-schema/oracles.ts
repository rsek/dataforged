import { type JSONSchemaType as Schema } from 'ajv'
import { DF_KEY } from './attributes.js'
import { type Oracles as Types } from '@df-types'

export const OracleTableID: Schema<Types.OracleTableID> = {
  type: 'string',
  $comment: '{namespace}/oracles/{*}/{oracle}'
}

export const OracleTableColumn: Schema<Types.OracleTableColumn> = {
  type: 'object',
  required: ['content_type'],
  additionalProperties: false,
  properties: {
    content_type: {
      type: 'string',
      description: `'range' displays the number range. 'result', 'summary', and 'description' display the string value from the OracleTableRow's corresponding key.`,
      enum: ['result', 'summary', 'description', 'range']
    },
    label: { $ref: '#/$defs/Label' }
  },
  oneOf: [
    {
      title: 'OracleTableColumnRoll',
      properties: {
        content_type: { const: 'range' },
        label: { $ref: '#/$defs/Label', default: 'Roll' }
      }
    } as any,
    {
      title: 'OracleTableColumnResult',
      properties: {
        content_type: { const: 'result' },
        label: { $ref: '#/$defs/Label', default: 'Result' }
      }
    },
    {
      title: 'OracleTableColumnSummary',
      properties: {
        content_type: { const: 'summary' },
        label: { $ref: '#/$defs/Label', default: 'Summary' }
      }
    },
    {
      title: 'OracleTableColumnDescription',
      properties: {
        content_type: { const: 'description' },
        label: { $ref: '#/$defs/Label', default: 'Description' }
      }
    }
  ]
}

export const OracleCollectionColumn: Schema<
  Types.OracleCollectionColumn<Types.OracleTableColumn>
> = {
  type: 'object',
  required: ['content_type', 'table_key'],
  additionalProperties: false,
  properties: {
    ...OracleTableColumn.properties,
    table_key: {
      description:
        "A key from OracleCollection#contents, indicating which OracleTable's data is used in this column.",
      type: 'string',
      pattern: DF_KEY
    },
    color: { $ref: '#/$defs/Color' }
  },
  oneOf: OracleTableColumn.oneOf
}

const oracleTableRenderDefault: Types.OracleTableRendering = {
  style: 'table',
  columns: {
    roll: { content_type: 'range', label: 'Roll' },
    result: { content_type: 'result', label: 'Result' }
  }
}

export const OracleTableRendering: Schema<Types.OracleTableRendering> = {
  type: 'object',
  required: ['style'],
  additionalProperties: false,
  default: oracleTableRenderDefault,
  properties: {
    style: {
      type: 'string',
      description: `The style used to render this table in the source material.

        * embed_as_column: This table appears as a column of a table handled by its OracleCollection parent.
        * embed_in_row: This table appears in its entirety within the row of another table. Canonical examples appear in the Ironsworn Rulebook and Ironsworn: Delve.
        * table: A standard table, typically with a roll column and a result column.
        `,
      enum: ['embed_as_column', 'embed_in_row', 'table'],
      default: oracleTableRenderDefault.style
    },

    icon: { $ref: '#/$defs/Icon' },
    color: { $ref: '#/$defs/Color' },
    columns: {
      type: 'object',
      patternProperties: {
        [DF_KEY]: { $ref: '#/$defs/OracleTableColumn' } as any
      },
      default: oracleTableRenderDefault.columns
    } as any
  }
}

export const OracleTable: Schema<Types.OracleTable> = {
  type: 'object',
  required: ['_id', 'title', 'source', 'table'],
  additionalProperties: false,
  properties: {
    _id: { $ref: '#/$defs/OracleTableID' },
    title: { $ref: '#/$defs/Title' },
    source: { $ref: '#/$defs/Source' },
    summary: { $ref: '#/$defs/MarkdownSentences' },
    description: { $ref: '#/$defs/MarkdownParagraphs' },
    suggestions: { $ref: '#/$defs/Suggestions' },
    rendering: { $ref: '#/$defs/OracleTableRendering' },
    match: {
      title: 'Oracle match behavior',
      description: 'A handful of oracles have special behavior on a match.',
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
