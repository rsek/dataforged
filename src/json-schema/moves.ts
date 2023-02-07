import type * as Types from '@df-types/moves'
import { type JSONSchemaType as Schema } from 'ajv'

export const MoveID: Schema<Types.MoveID> = {
  type: 'string',
  $comment: '{namespace}/moves/{moveCategory}/{move}'
}
