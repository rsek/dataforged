import { type JSONSchemaType as Schema } from 'ajv'
import { type Metadata, type Regions as Types } from '@base-types'
import { schemaRef } from './common'

export const RegionEntryID: Schema<Types.RegionEntryID> = {
	type: 'string',
	pattern: /^[a-z0-9][a-z0-9_]+\/regions(\/[a-z][a-z_]*[a-z]){1}$/.source,
	examples: ['ironsworn/regions/shattered_wastes']
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
		_id: { $ref: '#/definitions/RegionEntryID' },
		name: { $ref: '#/definitions/Label' },
		summary: { $ref: '#/definitions/MarkdownSentences' },
		description: { $ref: '#/definitions/MarkdownParagraphs' },
		features: {
			type: 'array',
			items: { $ref: '#/definitions/MarkdownPhrase' } as any
		},
		quest_starter: { $ref: '#/definitions/MarkdownParagraph' },
		source: schemaRef<Metadata.Source>('Source'),
		suggestions: schemaRef<Metadata.SuggestionsBase>('Suggestions')
	}
}
