import { type JSONSchemaType as Schema } from 'ajv'
import { type Metadata, type Regions as Types } from 'schema'
import { refSchema } from './common'

export const RegionEntryID: Schema<Types.RegionEntryID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/regions(\/[a-z_]+){1}$/.source,
	examples: ['classic/regions/shattered_wastes']
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
		'id'
	],
	properties: {
		id: { $ref: '#/definitions/RegionEntryID' },
		name: refSchema<string>('Label'),
		summary: { $ref: '#/definitions/MarkdownString' },
		description: { $ref: '#/definitions/MarkdownString' },
		features: {
			type: 'array',
			items: { $ref: '#/definitions/MarkdownString' } as any
		},
		quest_starter: { $ref: '#/definitions/MarkdownString' },
		source: refSchema<Metadata.Source>('Source'),
		suggestions: refSchema<Metadata.SuggestionsBase>('Suggestions')
	}
}
