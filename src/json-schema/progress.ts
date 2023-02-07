import type * as Types from '@df-types/progress'
import { type JSONSchemaType as Schema } from 'ajv'

export const ChallengeRank: Schema<Types.ChallengeRank> = {
  type: 'integer',
  description:
    'Enumerates challenge ranks: 1=troublesome; 2=dangerous; 3=formidable; 4=extreme; 5=epic.',
  enum: [1, 2, 3, 4, 5]
}

export const ProgressTypeClassic: Schema<Types.ProgressTypeClassic> = {
  type: 'string',
  enum: [
    'combat',
    'vow',
    'scene_challenge',
    'journey',
    'delve',
    'bonds_classic'
  ]
}

export const ProgressTypeStarforged: Schema<Types.ProgressTypeStarforged> = {
  type: 'string',
  enum: [
    'combat',
    'vow',
    'scene_challenge',
    'expedition',
    'connection',
    'quests_legacy',
    'bonds_legacy',
    'discoveries_legacy'
  ]
}
