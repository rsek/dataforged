import { type JSONSchemaType as Schema } from 'ajv'
import { type Assets as Types } from '@df-types'

export const AssetID: Schema<Types.AssetID> = {
  type: 'string'
}
