import { JSONSchema7 } from 'json-schema'

const schema: JSONSchema7 = {
  definitions: {
    PlayerStatName: {
      enum: [
        'edge',
        'heart',
        'iron',
        'shadow',
        'wits'
      ]
    },
    PlayerCharacter: {
      properties: {
        stats: {
          type: 'object',
          propertyNames: {
            $ref: '#/definitions/PlayerStatName'
          },
          patternProperties: {
            '.*': {
              type: 'object',
              properties: {
                _id: {
                  $ref: '#/definitions/IDPlayerStat'
                },
                max: {
                  const: 4
                },
                min: {
                  const: 0
                },
                value: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 4
                }
              }
            }
          }
        },
        condition_meters: {
          type: 'object',
          patternProperties: {
            '^[a-z][a-z_+]*[a-z]$': {
              $ref: '#/definitions/AttributeConditionMeter'
            }
          }
        },
        momentum: {
          type: 'object',
          properties: {
            min: {
              type: 'integer',
              const: -6
            },
            max: {
              type: 'integer',
              default: 10,
              maximum: 10
            },
            value: {
              type: 'integer',
              default: 2
            },
            resetValue: {
              type: 'integer',
              default: 2,
              minimum: 0
            }
          }
        }
      }
    }
  }
}

export default schema
