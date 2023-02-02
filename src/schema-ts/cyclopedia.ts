import { JSONSchema7 } from 'json-schema'
import { merge } from 'lodash'
import { dfRecordSchema } from './utils'

/**
 * Schema with features common to "cyclopedia" style pages, such as Regions (*Ironsworn* classic) and Encounters (*Ironsworn* classic and *Starforged*)
 */
const CyclopediaEntry: JSONSchema7 = {
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

const RegionEntry: JSONSchema7 = merge(CyclopediaEntry,
  {
    required: [
      'quest_starter'
    ]
  })

const EncounterStub: JSONSchema7 = {
  required: ['rank', 'name', 'description', 'nature'],
  properties: {
    rank: { $ref: '#/definitions/ChallengeRank' },
    name: { $ref: '#/definitions/LocalizedLabel' },
    description: { $ref: '#/definitions/Description' },
    nature: { type: 'string' }
  }
}

const Encounter: JSONSchema7 = merge(CyclopediaEntry, {
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

const EncounterTypeStarforged: JSONSchema7 = {
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

const EncounterTypeClassic: JSONSchema7 = {
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

const EncounterVariantStarforged: JSONSchema7 = {
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

const EncounterStarforged: JSONSchema7 = {
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

const EncounterClassic: JSONSchema7 = {
  title: 'EncounterClassic',
  allOf: [{ $ref: '#/definitions/Encounter' }, {
    properties: {
      nature: {
        $ref: '#/definitions/EncounterTypeClassic'
      }
    }
  }]
}

const EncounterNatureClassic: JSONSchema7 = {
  title: 'EncounterNatureClassic',
  properties: {
    name: { $ref: '#/definitions/LocalizedLabel' },
    nature: { $ref: '#/definitions/EncounterTypeClassic' }
  }
}

const $defs: Record<string, JSONSchema7> = {
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

export default $defs
