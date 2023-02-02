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

export const OracleContentMetadata: JSONSchema7Definition = {
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
          'common_noun',
          'compound_noun',
          'fragment',
          'name',
          'noun',
          'plural',
          'possessive_case',
          'proper_noun',
          'proper_noun_fragment',
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
}

export const OracleTableRollMethod: JSONSchema7Definition = {
  description: `
  no_duplicates = Reroll duplicate OracleTableRows
  allow_duplicates = Don't reroll duplicate OracleTableRows
  make_it_worse = Don't reroll duplicate OracleTableRows; duplicates compound
  `,
  type: 'string',
  enum: [
    'no_duplicates',
    'allow_duplicates',
    'make_it_worse'
  ],
  default: 'no_duplicates'
}

export const OracleTableRoll: JSONSchema7Definition = {
  description: 'Parameters for an oracle table roll.',
  required: [
    'table'
  ],
  properties: {
    table: {
      $ref: '#/definitions/OracleTable.ID'
    },
    times: {
      description: 'The number of times to roll',
      type: 'integer',
      minimum: 1,
      default: 1
    },
    allow_duplicates: {
      description: 'TODO',
      type: 'boolean',
      default: false
    },
    make_it_worse: {
      description: 'TODO',
      type: 'boolean',
      default: false
    }
  }
}

export const OracleRowLike: JSONSchema7Definition = d100Range

export const OracleTableRowContentMetadata: JSONSchema7Definition = {}

export const OracleTableRenderMetadata: JSONSchema7Definition = {}

export const OracleTableRowRenderMetadata: JSONSchema7Definition = {
  definitions: {
    icon: {// TODO
    },
    images: {// TODO
    },
    color: {
      // TODO
    },
    embed_table: {
      description: 'The ID of another oracle table, which should be rendered *within* this table row.',
      // TODO: point to an example in the Ironsworn rulebook
      $ref: '#/definitions/OracleTable.ID'
    }
  }
}

export const OracleTableRow: JSONSchema7Definition = merge(d100RangeNullable, {
  type: 'object',
  required: [
    'result'
  ],
  additionalProperties: false,
  properties: {
    _id: {
      // TODO
      $ref: '#/definitions/Dataforged.ID'
    },
    floor: {
      description: 'The low end of the dice range for this table row.'
    },
    ceiling: {
      description: 'The high end of the dice range for this table row.'
    },
    result: {
      description: 'The primary result text for the row, annotated in Markdown.\nIn the book, this is frequently the only column aside from the roll column. Otherwise, it is the first column.\nSome tables label this column as something other than Result; see the parent (or grandparent) `Oracle.display` for more information.',
      $ref: '#/definitions/LocalizedMarkdown'
    },
    summary: {
      description: "A secondary markdown string that must be presented to the user for the implementation to be complete, but may benefit from progressive disclosure (such as a collapsible element, popover/tooltip, etc).\n\n`null` is used in cases where an 'empty' `OracleTableRow.summary` exists (example: Starship Type, p. 326). In the book, these table cells are rendered with the text `--` (and this is the recommended placeholder for tabular display). For display as a single result (e.g. VTT roll output), however, `null` values can be safely omitted.",
      oneOf: [
        {
          $ref: '#/definitions/Summary'
        },
        {
          type: 'null'
        }
      ]
    },
    template: {
      description: 'TODO',
      examples: [
        {result: }
      ],
      type: 'object',
      properties: {
        result: {
          $ref: '#/definitions/LocalizedTemplateString'
        },
        summary: {
          $ref: '#/definitions/LocalizedTemplateString'
        },
        description: {
          $ref: '#/definitions/LocalizedTemplateString'
        }
      }
    },
    rolls: {
      type: 'array',
      items: {
        $ref: '#/definitions/OracleTableRoll'
      }
    },
    suggestions: {
      $ref: '#/definitions/Suggestions'
    },
    render: {
      $ref: '#/definitions/RenderMetadata'
    }
  }
})

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
      content: {},
      match: {
        title: 'OracleMatchBehaviour',
        type: 'object',
        properties: {
          _id: {
            $ref: '#/definitions/Dataforged.ID'
          },
          text: {
            $ref: '#/definitions/LocalizedMarkdown'
          }
        },
        additionalProperties: false,
        required: [
          'text'
        ]
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
      }
    }
  })

export const schema: JSONSchema7 = {
  definitions: {
    OracleTableRoll,
    OracleTableRow,
    OracleTable,
    OracleSet,
    OracleContentMetadata
  }
}

export default schema
