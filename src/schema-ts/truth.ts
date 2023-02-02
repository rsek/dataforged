import { JSONSchema7Definition } from 'json-schema'

export const WorldTruthClassic: JSONSchema7Definition = {
  allOf: [
    {
      $ref: '#/definitions/SettingTruth'
    },
    {
      properties: {
        options: {
          type: 'array',
          maxItems: 3,
          minItems: 3,
          items: {
            type: 'object',
            required: [
              'description',
              'quest_starter'
            ],
            properties: {
              description: {
                $ref: '#/definitions/Description'
              },
              quest_starter: {
                $ref: '#/definitions/QuestStarter'
              }
            }
          }
        }
      }
    }
  ]
}

export const SettingTruthOption: JSONSchema7Definition = {
  required: [
    'quest_starter'
  ],
  additionalProperties: false,
  properties: {
    quest_starter: {
      $ref: '#/definitions/QuestStarter'
    }
  }
}

export const SettingTruth: JSONSchema7Definition = {
  type: 'object',
  required: [
    'name',
    'source'
  ],
  properties: {
    _id: {
      $ref: '#/definitions/ID'
    },
    name: {
      $ref: '#/definitions/LocalizedLabel'
    },
    source: {
      $ref: '#/definitions/Source'
    }
  }
}

const SettingTruthStarforged = {
  allOf: [
    {
      $ref: '#/definitions/SettingTruth'
    },
    {
      properties: {
        options: {
          $ref: '#/definitions/OracleTableRows'
        }
      }
    }
  ]
}

const definitions: Record<string, JSONSchema7Definition> = {
  SettingTruth,
  SettingTruthOption,
  SettingTruthStarforged,
  WorldTruthClassic

}
export default definitions
