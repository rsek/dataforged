import type * as Types from '@base-types'
import { type JTDSchemaType } from 'ajv/dist/core'

export const RegionEntry: JTDSchemaType<
	Types.Regions.RegionEntry,
	{
		ID: string
		Label: string
		MarkdownString: string
		Source: Types.Metadata.Source
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'ID' },
		name: { ref: 'Label' },
		source: { ref: 'Source' },
		summary: { ref: 'MarkdownString' },
		description: { ref: 'MarkdownString' },
		features: { elements: { ref: 'MarkdownString' } },
		quest_starter: { ref: 'MarkdownString' }
	},
	optionalProperties: { suggestions: { ref: 'Suggestions' } }
}
