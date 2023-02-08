import { schemaRef } from './common.js'
import { Metadata, type Rarities as Types } from '@df-types'
import { type JSONSchemaType as Schema } from 'ajv'

export const RarityID: Schema<Types.RarityID> = {
  type: 'string',
  $comment: '{namespace}/rarities/{rarity}'
  // TODO: pattern
}

export const Rarity: Schema<Types.Rarity> = {
  type: 'object',
  description: 'A rarity from Ironsworn: Delve.',
  required: ['_id', 'asset', 'description', 'name', 'source', 'xp_cost'],
  additionalProperties: false,
  properties: {
    _id: { $ref: '#/$defs/RarityID' },
    name: { $ref: '#/$defs/Label' },
    asset: {
      description: 'The asset enhanced by this rarity.',
      $ref: '#/$defs/AssetID'
    },
    icon: { $ref: '#/$defs/Icon' },
    xp_cost: {
      description: `From Ironsworn: Delve, p. 174:

    Some assets will bring a rarity into play more often than others, so the experience point cost for a rarity will vary by the linked asset. These costs are shown in the tables on page 175.

    If you are playing solo, and aren’t concerned with the relative balance of rarity abilities, you can ignore these variable costs. If so, spend 3 experience points to purchase a rarity.`,

      type: 'integer',
      min: 3,
      max: 5,
      default: 3
    },
    description: { $ref: '#/$defs/MarkdownParagraphs' },
    source: { $ref: '#/$defs/Source' },
    suggestions: schemaRef<Metadata.Suggestions>('Suggestions') as any
  }
}
