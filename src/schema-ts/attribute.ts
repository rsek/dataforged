import { JSONSchema7 } from 'json-schema'

const schema: JSONSchema7 = {
  definitions: {
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
          $ref: '#/definitions/AttributePlayerStat'
        },
        {
          $ref: '#/definitions/AttributePlayerConditionMeter'
        },
        {
          $ref: '#/definitions/AttributeText'
        },
        {
          $ref: '#/definitions/AttributeImpact'
        },
        {
          $ref: '#/definitions/AttributeConditionMeter'
        }
      ]
    },
    AttributeClock: {
      allOf: [
        {
          $ref: '#/definitions/AttributeNumericBase'
        },
        {
          required: [
            'attribute_type',
            'min',
            'value',
            'max'
          ],
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
          $ref: '#/definitions/AttributeNumericBase'
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
              $ref: '#/definitions/LocalizedLabel'
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
      description: 'A select element with predefined options to pick a standard player character condition meter.',
      allOf: [
        {
          $ref: '#/definitions/AttributeBase'
        },
        {
          required: [
            'attribute_type',
            'value',
            'options',
            'position'
          ],
          properties: {
            attribute_type: {
              const: 'player_condition_meter'
            },
            position: {
              default: 'card-top'
            },
            value: {
              description: "The current value of this attribute. In Dataforged/Datasworn's data, this will almost always be `null`, but other values are provided to ensure that types generated from the schema can be used at run-time or for static typing.",
              oneOf: [
                {
                  type: 'null'
                },
                {
                  $ref: '#/definitions/IDPlayerConditionMeter'
                }
              ],
              default: null
            },
            options: {
              type: 'object',
              patternProperties: {
                '^[a-z][a-z_+]*[a-z]$': {
                  type: 'object',
                  properties: {
                    label: {
                      $ref: '#/definitions/LocalizedLabel'
                    },
                    value: {
                      $ref: '#/definitions/IDPlayerConditionMeter'
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
      description: "A text attribute that accepts a user-provided string value. Recommended HTML element: <input type='text'>",
      allOf: [
        {
          $ref: '#/definitions/AttributeBase'
        },
        {
          required: [
            'attribute_type',
            'position',
            'value'
          ],
          properties: {
            attribute_type: {
              const: 'text'
            },
            position: {
              default: 'card-top'
            },
            value: {
              type: [
                'null',
                'string'
              ],
              default: null
            }
          }
        }
      ]
    },
    AttributePlayerStat: {
      description: 'An attribute with predefined options to pick a standard player character stat. Recommended HTML element: <select>',
      allOf: [
        {
          $ref: '#/definitions/AttributeBase'
        },
        {
          required: [
            'attribute_type',
            'position',
            'value',
            'options'
          ],
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
                  $ref: '#/definitions/IDPlayerStat'
                }
              ],
              default: null
            },
            options: {
              type: 'object',
              patternProperties: {
                '^[a-z][a-z_+]*[a-z]$': {
                  type: 'object',
                  properties: {
                    label: {
                      $ref: '#/definitions/LocalizedLabel'
                    },
                    value: {
                      $ref: '#/definitions/IDPlayerStat'
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
        $ref: '#/definitions/IDAttribute'
      },
      patternProperties: {
        '^.*$': {
          $ref: '#/definitions/IDPlayerStat'
        }
      }
    },
    AttributeNumericType: {
      type: 'string',
      enum: [
        'condition_meter',
        'clock',
        'counter'
      ]
    },
    AttributeCounter: {
      allOf: [
        {
          $ref: '#definitions/AttributeNumericBase'
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
              type: [
                'null',
                'integer'
              ],
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
      description: "Schema from which other numeric attributes are derived. Shouldn't be used directly.",
      type: 'object',
      allOf: [
        {
          $ref: '#/definitions/AttributeBase'
        },
        {
          required: [
            'min',
            'max',
            'value',
            'attribute_type'
          ],
          properties: {
            attribute_type: {
              $ref: '#/definitions/AttributeNumericType'
            },
            min: {
              type: 'integer'
            },
            max: {
              type: [
                'integer',
                'null'
              ]
            },
            value: {
              type: [
                'integer',
                'null'
              ]
            }
          }
        }
      ]
    },
    AttributeNumericOverride: {
      description: 'Adjusts an existing numeric input, usually a condition meter',
      type: 'object',
      additionalProperties: false,
      required: [
        '_extends'
      ],
      properties: {
        _extends: {
          $ref: '#/definitions/IDAttribute'
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
          $ref: '#/definitions/AttributeBase'
        },
        {
          required: [
            'attribute_type'
          ],
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
      required: [
        'attribute_type',
        'position',
        'label'
      ],
      properties: {
        _id: {
          $ref: '#/definitions/IDAttribute'
        },
        label: {
          $ref: '#/definitions/LocalizedLabel'
        },
        position: {
          $ref: '#/definitions/InputPosition'
        },
        attribute_type: {
          oneOf: [
            {
              $ref: '#/definitions/AttributeNumericType'
            },
            {
              type: 'string',
              enum: [
                'player_stat',
                'player_condition_meter',
                'impact',
                'text'
              ]
            }
          ]
        }
      }
    }
  }
}

export default schema
