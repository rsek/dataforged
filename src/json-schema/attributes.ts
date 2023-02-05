import { type JSONSchema7 } from 'json-schema'

export const DF_KEY = /$[a-z][a-z_]*[a-z]^/.source

const $defs: Record<string, JSONSchema7> = {
  CustomStat: {
    type: 'object',
    required: ['label', 'options'],
    properties: {
      label: {
        $ref: '#/$defs/Label'
      },
      options: {
        title: 'CustomStatOptions',
        type: 'object',
        patternProperties: {
          [DF_KEY]: {
            title: 'CustomStatOption',
            type: 'object',
            required: ['label', 'value'],
            properties: {
              label: {
                $ref: '#/$defs/Label'
              },
              value: {
                description:
                  'The numeric value to be used as +stat when making an Action Roll.',
                type: 'integer',
                minimum: 0
              }
            },
            additionalProperties: false
          }
        }
      }
    },
    additionalProperties: false
  },
  InputPosition: {
    title: 'InputPosition',
    enum: [
      'card-top',
      'card-back',
      'card-bottom',
      'ability-1-right',
      'ability-2-right',
      'ability-3-right',
      'ability-1-bottom',
      'ability-2-bottom',
      'ability-3-bottom'
    ],
    type: 'string'
  },
  Attribute: {
    oneOf: [
      {
        $ref: '#/$defs/AttributePlayerStat'
      },
      {
        $ref: '#/$defs/AttributePlayerConditionMeter'
      },
      {
        $ref: '#/$defs/AttributeText'
      },
      {
        $ref: '#/$defs/AttributeImpact'
      },
      {
        $ref: '#/$defs/AttributeConditionMeter'
      }
    ]
  },
  AttributeClock: {
    allOf: [
      {
        $ref: '#/$defs/AttributeNumericBase'
      },
      {
        required: ['attribute_type', 'min', 'value', 'max'],
        properties: {
          attribute_type: {
            const: 'clock'
          },
          min: {
            const: 0
          },
          value: {
            default: 0
          },
          max: {
            title: 'ClockSegments',
            type: 'integer',
            multipleOf: 2,
            minimum: 4,
            maximum: 10
          }
        }
      }
    ]
  },
  AttributeConditionMeter: {
    allOf: [
      {
        $ref: '#/$defs/AttributeNumericBase'
      },
      {
        required: [
          'label',
          'position',
          'attribute_type',
          'min',
          'value',
          'max'
        ],
        properties: {
          label: {
            $ref: '#/$defs/Label'
          },
          position: {
            const: 'card-bottom'
          },
          attribute_type: {
            const: 'condition_meter'
          },
          value: {
            type: 'integer'
          },
          max: {
            type: 'integer'
          },
          min: {
            const: 0
          }
        }
      }
    ]
  },
  AttributePlayerConditionMeter: {
    description:
      'A select element with predefined options to pick a standard player character condition meter.',
    allOf: [
      {
        $ref: '#/$defs/AttributeBase'
      },
      {
        required: ['attribute_type', 'value', 'options', 'position'],
        properties: {
          attribute_type: {
            const: 'player_condition_meter'
          },
          position: {
            default: 'card-top'
          },
          value: {
            description:
              "The current value of this attribute. In Dataforged/Datasworn's data, this will almost always be `null`, but other values are provided to ensure that types generated from the schema can be used at run-time or for static typing.",
            oneOf: [
              {
                type: 'null'
              },
              {
                $ref: '#/$defs/PlayerConditionMeterID'
              }
            ],
            default: null
          },
          options: {
            type: 'object',
            patternProperties: {
              [DF_KEY]: {
                type: 'object',
                properties: {
                  label: {
                    $ref: '#/$defs/Label'
                  },
                  value: {
                    $ref: '#/$defs/PlayerConditionMeterID'
                  }
                }
              }
            }
          }
        }
      }
    ]
  },
  AttributeText: {
    description:
      "A text attribute that accepts a user-provided string value. Recommended HTML element: <input type='text'>",
    allOf: [
      {
        $ref: '#/$defs/AttributeBase'
      },
      {
        required: ['attribute_type', 'position', 'value'],
        properties: {
          attribute_type: {
            const: 'text'
          },
          position: {
            default: 'card-top'
          },
          value: {
            type: ['null', 'string'],
            default: null
          }
        }
      }
    ]
  },
  AttributePlayerStat: {
    description:
      'An attribute with predefined options to pick a standard player character stat. Recommended HTML element: <select>',
    allOf: [
      {
        $ref: '#/$defs/AttributeBase'
      },
      {
        required: ['attribute_type', 'position', 'value', 'options'],
        properties: {
          attribute_type: {
            const: 'player_stat'
          },
          position: {
            default: 'card-top'
          },
          value: {
            oneOf: [
              {
                type: 'null'
              },
              {
                $ref: '#/$defs/PlayerStatID'
              }
            ],
            default: null
          },
          options: {
            type: 'object',
            patternProperties: {
              [DF_KEY]: {
                type: 'object',
                properties: {
                  label: {
                    $ref: '#/$defs/Label'
                  },
                  value: {
                    $ref: '#/$defs/PlayerStatID'
                  }
                }
              }
            }
          }
        }
      }
    ]
  },
  AttributeSetter: {
    propertyNames: {
      $ref: '#/$defs/AttributeID'
    },
    patternProperties: {
      '^.*$': {
        $ref: '#/$defs/PlayerStatID'
      }
    }
  },
  AttributeNumericType: {
    type: 'string',
    enum: ['condition_meter', 'clock', 'counter']
  },
  AttributeCounter: {
    allOf: [
      {
        $ref: '#/$defs/AttributeNumericBase'
      },
      {
        properties: {
          attribute_type: {
            const: 'counter'
          },
          min: {
            type: 'integer',
            default: 0
          },
          max: {
            type: ['null', 'integer'],
            default: null
          },
          value: {
            type: 'integer',
            default: 0
          }
        }
      }
    ]
  },
  AttributeNumericBase: {
    description:
      "Schema from which other numeric attributes are derived. Shouldn't be used directly.",
    type: 'object',
    allOf: [
      {
        $ref: '#/$defs/AttributeBase'
      },
      {
        required: ['min', 'max', 'value', 'attribute_type'],
        properties: {
          attribute_type: {
            $ref: '#/$defs/AttributeNumericType'
          },
          min: {
            type: 'integer'
          },
          max: {
            type: ['integer', 'null']
          },
          value: {
            type: ['integer', 'null']
          }
        }
      }
    ]
  },
  AttributeNumericOverride: {
    description: 'Adjusts an existing numeric input, usually a condition meter',
    type: 'object',
    additionalProperties: false,
    required: ['_extends'],
    properties: {
      _extends: {
        $ref: '#/$defs/AttributeID'
      },
      min: {
        type: 'integer'
      },
      max: {
        type: 'integer'
      },
      value: {
        type: 'integer'
      }
    }
  },
  AttributeImpact: {
    allOf: [
      {
        $ref: '#/$defs/AttributeBase'
      },
      {
        required: ['attribute_type'],
        properties: {
          attribute_type: {
            const: 'impact'
          }
        }
      }
    ]
  },
  AttributeBase: {
    type: 'object',
    required: ['attribute_type', 'position', 'label'],
    properties: {
      _id: {
        $ref: '#/$defs/AttributeID'
      },
      label: {
        $ref: '#/$defs/Label'
      },
      position: {
        $ref: '#/$defs/InputPosition'
      },
      attribute_type: {
        oneOf: [
          {
            $ref: '#/$defs/AttributeNumericType'
          },
          {
            type: 'string',
            enum: ['player_stat', 'player_condition_meter', 'impact', 'text']
          }
        ]
      }
    }
  }
}

export default $defs
