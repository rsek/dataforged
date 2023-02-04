import { type JSONSchema7 } from 'json-schema'
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
      $ref: '#/$defs/ID'
    },
    name: {
      $ref: '#/$defs/LocalizedLabel'
    },
    source: {
      $ref: '#/$defs/Source'
    },
    tags: {
      $ref: '#/$defs/Tags'
    },
    summary: {
      $ref: '#/$defs/Summary'
    },
    description: {
      $ref: '#/$defs/Description'
    },
    features: {
      type: 'array',
      items: {
        $ref: '#/$defs/LocalizedMarkdown'
      }
    },
    quest_starter: {
      $ref: '#/$defs/QuestStarter'
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
    rank: { $ref: '#/$defs/ChallengeRank' },
    name: { $ref: '#/$defs/LocalizedLabel' },
    description: { $ref: '#/$defs/Description' },
    nature: { type: 'string' }
  }
}

const Encounter: JSONSchema7 = merge(CyclopediaEntry, {
  description: 'Schema common to Encounter entries in *Ironsworn* and *Ironsworn: Starforged*.',
  allOf: [
    { $ref: '#/$defs/EncounterStub' },
    {
      required: [
        'drives',
        'tactics'
      ],
      properties: {
        drives: {
          type: 'array',
          items: {
            $ref: '#/$defs/LocalizedMarkdown'
          }
        },
        tactics: {
          type: 'array',
          items: {
            $ref: '#/$defs/LocalizedMarkdown'
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
    { $ref: '#/$defs/Encounter' },
    {
      properties: {
        nature: {
          $ref: '#/$defs/EncounterTypeStarforged'
        }
      }
    }
  ]
}

const EncounterStarforged: JSONSchema7 = {
  title: 'EncounterStarforged',
  allOf: [
    {
      $ref: '#/$defs/Encounter'
    },
    {
      properties: {
        nature: {
          $ref: '#/$defs/EncounterTypeStarforged'
        },
        variants: dfRecordSchema('EncounterVariantStarforged', 'EncounterVariantsStarforged')
      }
    }
  ]
}

const EncounterClassic: JSONSchema7 = {
  title: 'EncounterClassic',
  allOf: [{ $ref: '#/$defs/Encounter' }, {
    properties: {
      nature: {
        $ref: '#/$defs/EncounterTypeClassic'
      }
    }
  }]
}

const EncounterNatureClassic: JSONSchema7 = {
  title: 'EncounterNatureClassic',
  properties: {
    name: { $ref: '#/$defs/LocalizedLabel' },
    nature: { $ref: '#/$defs/EncounterTypeClassic' }
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
