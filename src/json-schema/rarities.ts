import { type Rarities as Types } from '@df-types'
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
    asset: { $ref: '#/$defs/AssetID' },
    icon: { $ref: '#/$defs/Icon' },
    xp_cost: { type: 'integer', min: 3, max: 5, default: 3 },
    description: { $ref: '#/$defs/MarkdownParagraphs' },
    source: { $ref: '#/$defs/Source' }
  }
}
