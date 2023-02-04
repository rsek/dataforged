import { type JSONSchemaType as Schema } from 'ajv'
import { type Encounters as Types } from 'src/types'

export const NatureStarforged: Schema<Types.NatureStarforged> = {
  type: 'string',
  examples: ['creature', 'horror', 'human', 'machine', 'monster', 'vehicle']
}
export const NatureClassic: Schema<Types.NatureClassic> = {
  type: 'string',
  examples: ['Ironlander', 'firstborn', 'animal', 'beast', 'horror', 'anomaly']
}
