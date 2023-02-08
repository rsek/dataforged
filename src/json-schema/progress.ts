import type * as Types from '@base-types/progress'
import { type JSONSchemaType as Schema } from 'ajv'

export const ChallengeRank: Schema<Types.ChallengeRank> = {
  type: 'integer',
  description:
    'Enumerates challenge ranks: 1=troublesome; 2=dangerous; 3=formidable; 4=extreme; 5=epic.',
  enum: [1, 2, 3, 4, 5]
}

export const ProgressTypeClassic: Schema<Types.ProgressTypeClassic> = {
  type: 'string',
  description:
    'Standard progress track types found in Ironsworn or Ironsworn: Delve',
  enum: [
    'combat_progress',
    'vow_progress',
    'scene_challenge_progress',
    'journey_progress',
    'delve_progress',
    'bonds_progress'
  ]
}

export const ProgressTypeStarforged: Schema<Types.ProgressTypeStarforged> = {
  type: 'string',
  description: 'Standard progress track types found in Ironsworn: Starforged.',
  enum: [
    'combat_progress',
    'vow_progress',
    'scene_challenge_progress',
    'expedition_progress',
    'connection_progress',
    'quests_legacy',
    'bonds_legacy',
    'discoveries_legacy'
  ]
}
