import { type JSONSchemaType as Schema } from 'ajv'
import { type Players as Types } from '@base-types'

export const StatID: Schema<Types.StatID> = {
  type: 'string',
  description: 'ID for a standard player character stat.',
  enum: [
    'player/stats/edge',
    'player/stats/heart',
    'player/stats/iron',
    'player/stats/shadow',
    'player/stats/wits'
  ]
}

export const ConditionMeterID: Schema<Types.ConditionMeterID> = {
  type: 'string',
  description: 'ID for a standard player character condition meter.',
  enum: [
    'player/condition_meters/health',
    'player/condition_meters/spirit',
    'player/condition_meters/supply'
  ]
}
