import type * as Types from 'src/types/moves'
import { type JSONSchemaType as Schema } from 'ajv'

export const MoveID: Schema<Types.MoveID> = {
  type: 'string',
  $comment: '{namespace}/moves/{moveCategory}/{move}'
}
