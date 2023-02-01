import { JSONSchema7 } from 'json-schema'

const schema: JSONSchema7 = {
  definitions: {
    SettingTruthOption: {
      required: [
        'quest_starter'
      ],
      additionalProperties: false,
      properties: {
        quest_starter: {
          $ref: '#/definitions/QuestStarter'
        }
      }
    },
    SettingTruth: {
      type: 'object',
      required: [
        'name',
        'source'
      ],
      properties: {
        _id: {
          $ref: '#/definitions/IDDataforged'
        },
        name: {
          $ref: '#/definitions/LocalizedLabel'
        },
        source: {
          $ref: '#/definitions/Source'
        }
      }
    }
  }
}
export default schema
