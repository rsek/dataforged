import { JSONSchema7, JSONSchema7Definition } from 'json-schema'

const ChallengeRank: JSONSchema7Definition = {
  type: 'integer',
  description: 'A numeric challenge rank: 1 = troublesome; 2 = dangerous; 3 = formidable; 4 = extreme; 5 = epic.',
  enum: [
    1,
    2,
    3,
    4,
    5
  ]
}
const CyclopediaEntry: JSONSchema7Definition = {
  description: 'Schema common to "cyclopedia" style pages, such as Regions (*Ironsworn* classic) and Encounters (*Ironsworn* classic and *Starforged*) ',
  required: [
    'name',
    'description'
  ],
  properties: {
    _id: {
      $ref: '#/definitions/Dataforged.ID'
    },
    name: {
      $ref: '#/definitions/LocalizedLabel'
    },
    source: {
      $ref: '#/definitions/Source'
    },
    tags: {
      $ref: '#/definitions/Tags'
    },
    description: {
      $ref: '#/definitions/Description'
    },
    summary: {
      $ref: '#/definitions/Summary'
    },
    features: {
      type: 'array',
      items: {
        $ref: '#/definitions/LocalizedMarkdown'
      }
    },
    quest_starter: {
      $ref: '#/definitions/QuestStarter'
    }
  }
}

export const RegionEntry: JSONSchema7Definition = {
          allOf: [
            {
              $ref: '#/definitions/CyclopediaEntry'
            },
            {
              required: [
                'description',
                'features',
                'quest_starter',
                'summary'
              ]
            }
          ]}

const Encounter: JSONSchema7Definition = {
  description: 'Schema common to Encounter entries in *Ironsworn* and *Ironsworn: Starforged*.',
  allOf: [
    {
      $ref: '#/definitions/CyclopediaEntry'
    },
    {
      type: 'object',
      required: [
        'rank'
      ],
      properties: {
        nature: {
          type: 'string'
        },
        summary: {
          $ref: '#/definitions/Summary'
        },
        rank: {
          $ref: '#/definitions/ChallengeRank'
        },
        drives: {
          type: 'array',
          items: {
            $ref: '#/definitions/LocalizedMarkdown'
          }
        },
        tactics: {
          type: 'array',
          items: {
            $ref: '#/definitions/LocalizedMarkdown'
          }
        }
      }
    }
  ]
}

const schema: JSONSchema7 = {
  definitions: {
    ChallengeRank,
    CyclopediaEntry,
    Encounter
  }
}

export default schema
