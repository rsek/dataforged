import { type JSONSchemaType as Schema } from 'ajv'
import { type Regions as Types } from 'src/types'

export const RegionEntryID: Schema<Types.RegionEntryID> = {
  type: 'string',
  $comment: '{namespace}/regions/{region}'
  // TODO: pattern
}
export const RegionEntry: Schema<Types.RegionEntry> = {
  type: 'object',
  description:
    'A region entry, like the Ironlands region entries found in classic Ironsworn.',
  required: [
    'name',
    'summary',
    'features',
    'description',
    'quest_starter',
    'source',
    '_id'
  ],
  properties: {
    _id: { $ref: '#/$defs/RegionEntry.ID' },
    name: { $ref: '#/$defs/Label' },
    summary: { $ref: '#/$defs/MarkdownSentences' },
    description: { $ref: '#/$defs/MarkdownParagraphs' },
    features: {
      type: 'array',
      items: { $ref: '#/$defs/MarkdownPhrase' } as any
    },
    quest_starter: { $ref: '#/$defs/MarkdownParagraph' },
    source: { $ref: '#/$defs/Metadata.Source' }
  }
}
