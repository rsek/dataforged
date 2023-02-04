import { type JSONSchemaType as Schema } from 'ajv'
import { type Encounters as Types } from 'src/types'

export const NatureStarforged: Schema<Types.EncounterNatureStarforged> = {
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
    nature: { $ref: '#/$defs/NatureClassic' },
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
    quest_starter: { $ref: '#/$defs/MarkdownParagraphs' },
    your_truths: { $ref: '#/$defs/MarkdownSentences' },
    source: { $ref: '#/$defs/Source' },
    _id: { $ref: '#/$defs/EncounterNatureClassic' }
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
    name: { $ref: '#/$defs/Label' },
    nature: { $ref: '#/$defs/EncounterNatureStarforged' },
    summary: { $ref: '#/$defs/MarkdownSentences' },
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
    variants: { $ref: '#/$defs/EncounterVariantStarforged' },
    description: { $ref: '#/$defs/MarkdownParagraphs' },
    quest_starter: { $ref: '#/$defs/MarkdownParagraphs' },
    source: { $ref: '#/$defs/Source' },
    _id: { $ref: '#/$defs/EncounterStarforgedID' }
  }
}
