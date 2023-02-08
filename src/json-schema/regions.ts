import { type JSONSchemaType as Schema } from 'ajv'
import { Metadata, type Regions as Types } from '@df-types'
import { schemaRef } from './common.js'

export const RegionEntryID: Schema<Types.RegionEntryID> = {
  type: 'string',
  $comment: '{namespace}/regions/{region}',
  pattern: /^[a-z0-9][a-z0-9_]+\/regions(\/[a-z][a-z_]*[a-z]){1}$/.source
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
    _id: { $ref: '#/$defs/RegionEntryID' },
    name: { $ref: '#/$defs/Label' },
    summary: { $ref: '#/$defs/MarkdownSentences' },
    description: { $ref: '#/$defs/MarkdownParagraphs' },
    features: {
      type: 'array',
      items: { $ref: '#/$defs/MarkdownPhrase' } as any
    },
    quest_starter: { $ref: '#/$defs/MarkdownParagraph' },
    source: { $ref: '#/$defs/Source' },
    suggestions: schemaRef<Metadata.Suggestions>('Suggestions') as any
  }
}
