import type * as Types from 'src/types/progress'
import { type JSONSchemaType as Schema } from 'ajv'

export const ChallengeRank: Schema<Types.ChallengeRank> = {
  type: 'integer',
  description:
    'Enumerates challenge ranks: 1=troublesome; 2=dangerous; 3=formidable; 4=extreme; 5=epic.',
  enum: [1, 2, 3, 4, 5]
}
