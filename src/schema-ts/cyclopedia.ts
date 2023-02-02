import { JSONSchema7Definition } from 'json-schema'
import { merge } from 'lodash'
import { dfRecordSchema } from './utils'

/**
 * Schema with features common to "cyclopedia" style pages, such as Regions (*Ironsworn* classic) and Encounters (*Ironsworn* classic and *Starforged*)
 */
const CyclopediaEntry: JSONSchema7Definition = {
  type: 'object',
  required: [
    'name',
    'features',
    'summary',
    'description'
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
    },
    tags: {
      $ref: '#/definitions/Tags'
    },
    summary: {
      $ref: '#/definitions/Summary'
    },
    description: {
      $ref: '#/definitions/Description'
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

const RegionEntry: JSONSchema7Definition = merge(CyclopediaEntry,
  {
    required: [
      'quest_starter'
    ]
  })

const EncounterStub: JSONSchema7Definition = {
  required: ['rank', 'name', 'description', 'nature'],
  properties: {
    rank: { $ref: '#/definitions/ChallengeRank' },
    name: { $ref: '#/definitions/LocalizableLabel' },
    description: { $ref: '#/definitions/Description' },
    nature: { type: 'string' }
  }
}

const Encounter: JSONSchema7Definition = merge(CyclopediaEntry, {
  description: 'Schema common to Encounter entries in *Ironsworn* and *Ironsworn: Starforged*.',
  allOf: [
    { $ref: '#/definitions/EncounterStub' },
    {
      required: [
        'drives',
        'tactics'
      ],
      properties: {
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

})

const EncounterTypeStarforged: JSONSchema7Definition = {
  title: 'EncounterTypeStarforged',
  type: 'string',
  examples: [
    'creature',
    'horror',
    'human',
    'machine',
    'monster',
    'vehicle'
  ]
}

const EncounterTypeClassic: JSONSchema7Definition = {
  title: 'EncounterTypeClassic',
  type: 'string',
  examples: [
    'Ironlander',
    'firstborn',
    'animal',
    'beast',
    'horror',
    'anomaly'
  ]
}

const EncounterVariantStarforged: JSONSchema7Definition = {
  title: 'EncounterVariantStarforged',
  allOf: [
    { $ref: '#/definitions/Encounter' },
    {
      properties: {
        nature: {
          $ref: '#/definitions/EncounterTypeStarforged'
        }
      }
    }
  ]
}

const EncounterStarforged: JSONSchema7Definition = {
  title: 'EncounterStarforged',
  allOf: [
    {
      $ref: '#/definitions/Encounter'
    },
    {
      properties: {
        nature: {
          $ref: '#/definitions/EncounterTypeStarforged'
        },
        variants: dfRecordSchema('EncounterVariantStarforged', 'EncounterVariantsStarforged')
      }
    }
  ]
}

const EncounterClassic: JSONSchema7Definition = {
  title: 'EncounterClassic',
  allOf: [{ $ref: '#/definitions/Encounter' }, {
    properties: {
      nature: {
        $ref: '#/definitions/EncounterTypeClassic'
      }
    }
  }]
}

const EncounterNatureClassic: JSONSchema7Definition = {
  title: 'EncounterNatureClassic',
  properties: {
    name: { $ref: '#/definitions/LocalizedLabel' },
    nature: { $ref: '#/definitions/EncounterTypeClassic' }
  }
}

const definitions: Record<string, JSONSchema7Definition> = {
  RegionEntry,
  EncounterStub,
  Encounter,
  EncounterClassic,
  EncounterStarforged,
  EncounterVariantStarforged,
  EncounterTypeStarforged,
  EncounterTypeClassic,
  EncounterNatureClassic
}

export default definitions
