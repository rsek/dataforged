import { type JSONSchemaType as Schema } from 'ajv'
import { type Encounters as Types } from '@df-types'
import _ from 'lodash'

export const EncounterNatureStarforged: Schema<Types.EncounterNatureStarforged> =
  {
    type: 'string',
    examples: ['creature', 'horror', 'human', 'machine', 'monster', 'vehicle']
  }
export const EncounterNatureClassic: Schema<Types.EncounterNatureClassic> = {
  type: 'string',
  examples: ['Ironlander', 'firstborn', 'animal', 'beast', 'horror', 'anomaly']
}

export const EncounterClassicID: Schema<Types.EncounterClassicID> = {
  type: 'string',
  $comment: '{namespace}/encounters/{nature}/{encounter}'
}

export const EncounterStarforgedID: Schema<Types.EncounterStarforgedID> = {
  type: 'string',
  $comment: '{namespace}/encounters/{encounter}'
}

// FIXME: i should probably just make this game-specific across all things that use it.
export const EncounterID: Schema<Types.EncounterID> = {
  oneOf: [EncounterClassicID, EncounterStarforgedID]
}

export const EncounterClassic: Schema<Types.EncounterClassic> = {
  type: 'object',
  description:
    'An encounter entry similar to those in Chapter 5 of classic Ironsworn.',
  required: [
    'name',
    'nature',
    'rank',
    'features',
    'drives',
    'tactics',
    'description',
    'quest_starter',
    'source',
    '_id'
  ],
  properties: {
    name: { $ref: '#/$defs/Label' },
    nature: { $ref: '#/$defs/EncounterNatureClassic' },
    rank: { $ref: '#/$defs/ChallengeRank' },
    features: {
      type: 'array',
      items: { $ref: '#/$defs/MarkdownPhrase' } as any
    },
    drives: { type: 'array', items: { $ref: '#/$defs/MarkdownPhrase' } as any },
    tactics: {
      type: 'array',
      items: { $ref: '#/$defs/MarkdownPhrase' } as any
    },
    description: { $ref: '#/$defs/MarkdownParagraphs' },
    quest_starter: {
      description:
        'A localizable markdown string describing the quest starter associated with this item.',
      $ref: '#/$defs/MarkdownParagraphs'
    },
    your_truths: { $ref: '#/$defs/MarkdownSentences' },
    source: { $ref: '#/$defs/Source' },
    _id: { $ref: '#/$defs/EncounterClassicID' }
  }
}

export const EncounterStarforged: Schema<Types.EncounterStarforged> = {
  type: 'object',
  description:
    'An encounter entry similar to those in Chapter 4 of Ironsworn: Starforged.',
  required: [
    'name',
    'nature',
    'summary',
    'rank',
    'features',
    'drives',
    'tactics',
    'description',
    'quest_starter',
    'source',
    '_id'
  ],
  properties: {
    name: EncounterClassic.properties!.name,
    nature: { $ref: '#/$defs/EncounterNatureStarforged' },
    summary: { $ref: '#/$defs/MarkdownSentences' },
    rank: EncounterClassic.properties!.rank,
    features: EncounterClassic.properties!.features,
    drives: EncounterClassic.properties!.drives,
    tactics: EncounterClassic.properties!.tactics,
    variants: { $ref: '#/$defs/EncounterVariantStarforged' },
    description: EncounterClassic.properties!.description,
    quest_starter: EncounterClassic.properties!.quest_starter,
    source: EncounterClassic.properties!.source,
    _id: { $ref: '#/$defs/EncounterStarforgedID' }
  }
}

const SFVariantKeys = ['name', 'nature', 'rank', 'description']

export const EncounterVariantStarforged: Schema<Types.EncounterVariantStarforged> =
  {
    type: 'object',
    additionalProperties: false,
    required: SFVariantKeys as any,
    properties: _.pick(EncounterStarforged.properties, ...SFVariantKeys) as any
  }
