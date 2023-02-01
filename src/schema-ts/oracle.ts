import { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import { merge } from 'lodash-es'
import { dfRecord } from 'src/schema-ts/schema.js'

const d100Value: JSONSchema7Definition = {
  type: 'integer',
  minimum: 1,
  maximum: 100
}

const d100Range: JSONSchema7Definition = {
  type: 'object',
  required: [
    'floor',
    'ceiling'
  ],
  properties: {

    floor: merge({ description: 'The high end of the dice range for this table row.' }, d100Value),
    ceiling: merge(
      { description: 'The low end of the dice range for this table row.' }, d100Value)
  }
}

const d100RangeNullable: JSONSchema7Definition = {
  type: d100Range.type,
  required: d100Range.required,
  oneOf: [
    { properties: d100Range.properties },
    { properties: { floor: { type: 'null' }, ceiling: { type: 'null' } } }
  ]
}

export const OracleRowLike: JSONSchema7Definition = d100Range

export const OracleTableRow: JSONSchema7Definition = {
  type: 'object',
  required: [
    'result',
    'floor',
    'ceiling'
  ],
  additionalProperties: false,
  properties: {
    _id: {
      // TODO
      $ref: '#/definitions/IDDataforged'
    },
    floor: {
      description: 'The low end of the dice range for this table row.',
      ...d100Value
    },
    ceiling: {
      description: 'The high end of the dice range for this table row.',
      ...d100Value
    },
    result: {
      description: 'The primary result text for the row, annotated in Markdown.\nIn the book, this is frequently the only column aside from the roll column. Otherwise, it is the first column.\nSome tables label this column as something other than Result; see the parent (or grandparent) `Oracle.display` for more information.',
      $ref: '#/definitions/LocalizedMarkdown'
    },
    summary: {
      description: "A secondary markdown string that must be presented to the user for the implementation to be complete, but may benefit from progressive disclosure (such as a collapsible element, popover/tooltip, etc).\n\nGenerally, `OracleTableRow.summary` is longer than `OracleTableRow.result`.\n\nSome tables label this column as something other than `OracleTableRow.result`; see the parent (or grandparent) `Oracle.Display.Table` for more information.\n\n`null` is used in cases where an 'empty' `OracleTableRow.summary` exists (example: Starship Type, p. 326). In the book, these table cells are rendered with the text `--` (and this is the recommended placeholder for tabular display). For display as a single result (e.g. VTT roll output), however, `null` values can be safely omitted.",
      oneOf: [
        {
          $ref: '#/definitions/LocalizedMarkdown'
        },
        {
          type: 'null'
        }
      ]
    },
    roll_template: {
      $ref: '#/definitions/LocalizedTemplateStrings'
    },
    oracle_rolls: {
      type: 'array',
      items: {
        $ref: '#/definitions/IDOracleTable'
      }
    },
    suggestions: {
      $ref: '#/definitions/Suggestions'
    },
    render: {
      $ref: '#/definitions/RenderMetadata'
    },
    embed_table: {
      description: 'The ID of another oracle table ',
      $ref: '#/definitions/IDOracleTable'
    }
  }
}

/**
 * Shared oracle metadata.
 */
export const BaseOracle: JSONSchema7Definition = {
  required: ['title'],
  properties: {
    title: {
      $ref: '#/definitions/Title'
    },
    source: {
      $ref: '#/definitions/Source'
    },
    summary: {
      $ref: '#/definitions/Summary'
    },
    description: {
      $ref: '#/definitions/Description'
    }
  }
}

export const OracleSet: JSONSchema7Definition = merge(BaseOracle,
  {
    title: 'OracleSet',
    type: 'object',
    description: "Represents an oracle set: a grouping that can contain both {@link OracleTable}s and other instances of {@link OracleSet}, but doesn't have its own `Table` key.\n\nSee {@link Oracle} if you need to type both {@link OracleTable} and {@link OracleSet} to crawl the oracle hierarchy in search of a specific `_id`.",
    additionalProperties: false,
    properties: {
      _id: {
      // TODO: figure out ID type???
      },
      sets: dfRecord('OracleSet'),
      tables: dfRecord('OracleTable'),
      sample_names: {
        description: 'A list of sample names for this oracle set. Only used by Planets.',
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  })
export const OracleTable: JSONSchema7Definition = merge(BaseOracle,
  {
    type: 'object',
    required: ['table'],
    additionalProperties: false,
    properties: {
      _id: {
      // TODO: figure out ID type
      },
      content: {
        title: 'OracleContent',
        type: 'object',
        description: "Metadata that describes an oracle's semantic or lexical content.",
        additionalProperties: false,
        properties: {
          part_of_speech: {
            description: 'The part of speech of this oracle.',
            type: 'array',
            items: {
              examples: [
                'adjective',
                'common noun',
                'compound noun',
                'fragment',
                'name',
                'noun',
                'plural',
                'possessive case',
                'proper noun',
                'proper noun fragment',
                'sentences',
                'verb'
              ],
              type: 'string'
            }
          },
          tags: {
            description: 'Any arbitrary string tags associated with this oracle.',
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }
      },
      usage: {
        title: 'OracleUsage',
        type: 'object'
      },
      requires: {
        title: 'OracleRequirements',
        type: 'object'
      },
      render: {
        title: 'OracleTableRenderMetadata',
        type: 'object',
        allOf: [
          {
            $ref: '#/definitions/RenderMetadata'
          },
          {
            additionalProperties: false,
            properties: {
              columns: {
                type: 'object',
                additionalProperties: {
                  oneOf: [
                    {
                      $comment: '#/definitions/TableColumnRoll'
                    },
                    {
                      $comment: '#/definitions/TableColumnText'
                    }
                  ]
                }
              },
              column_of: {
                description: "If this oracle's `Table` should be rendered as a column of another table, it's indicated here.\n\nIf `undefined`, this table is rendered as a standalone table.\n\nIf this is set (and the rendering such 'embedded' columns is desired), then `Display.Table` may be safely ignored.",
                type: 'string'
              },
              embed_in: {
                description: 'This table is displayed as embedded in a row of another table.',
                type: 'string'
              },
              source: {
                $ref: '#/definitions/Source'
              }
            }
          }
        ]
      },
      table: {
        type: 'array',
        items: {
          $ref: '#/definitions/OracleTableRow'
        }
      },
      match: {
        title: 'OracleMatchBehaviour',
        type: 'object',
        properties: {
          _id: {
            $ref: '#/definitions/IDDataforged'
          },
          text: {
            $ref: '#/definitions/LocalizedMarkdown'
          }
        },
        additionalProperties: false,
        required: [
          'text'
        ]
      }
    }
  })

export const schema: JSONSchema7 = {
  definitions: {
    OracleSet,
    OracleTable,
    OracleTableRow
  }
}

export default schema
