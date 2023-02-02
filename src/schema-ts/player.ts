import { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import { DF_KEY } from 'src/schema-ts/id.js'

const MOMENTUM_MAX = 10
const MOMENTUM_MIN = -6
const MOMENTUM_RESET_BASE = 2
const MOMENTUM_RESET_MIN = 0
const STAT_MIN = 0
const STAT_MAX = 4

const
  PlayerExtension: JSONSchema7Definition = {
    title: 'PlayerExtension',
    description: 'Alters an attribute intrinsic to the player, such as a stat or condition meter.',
    type: 'object'
  }

const schema: JSONSchema7 = {
  definitions: {
    PlayerConditionMeterName: {
      enum: [
        'health',
        'spirit',
        'supply'
      ]
    },
    PlayerStat: {
      type: 'object',
      properties: {
        _id: {
          $ref: '#/definitions/PlayerStat.ID'
        },
        value: {
          type: 'integer',
          minimum: STAT_MIN,
          maximum: STAT_MAX
        }
      }
    },
    PlayerCharacter: {
      description: 'Schema used by both classic and Starforged characters',
      properties: {
        stats: {
          type: 'object',
          // TODO: reformat to harmonize with CustomStat?
          patternProperties: {
            [DF_KEY]: { $ref: '#/definitions/PlayerStat' }
          }
        },
        condition_meters: {
          type: 'object',
          patternProperties: {
            [DF_KEY]: {
              $ref: '#/definitions/AttributeConditionMeter'
            }
          }
        },
        momentum: {
          type: 'object',
          properties: {
            min: {
              type: 'integer',
              const: MOMENTUM_MIN
            },
            max: {
              type: 'integer',
              default: MOMENTUM_MAX,
              maximum: MOMENTUM_MAX,
              minimum: MOMENTUM_MIN
            },
            value: {
              type: 'integer',
              default: MOMENTUM_RESET_BASE,
              minimum: MOMENTUM_MIN,
              maximum: MOMENTUM_MAX
            },
            resetValue: {
              type: 'integer',
              default: MOMENTUM_RESET_BASE,
              maximum: MOMENTUM_MAX,
              minimum: MOMENTUM_RESET_MIN
            }
          }
        }
      }
    },
    PlayerExtension
  }
}

export default schema
