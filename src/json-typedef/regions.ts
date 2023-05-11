import type * as Types from 'schema'
import { type JTDSchemaType } from 'ajv/dist/core'
import { toJtdId } from 'json-typedef/utils'
import * as JSONSchema from '@schema-json'

export const RegionEntry: JTDSchemaType<
	Types.Regions.RegionEntry,
	{
		RegionEntryID: string
		Label: string
		MarkdownString: string
		Source: Types.Metadata.Source
		Suggestions: Types.Metadata.Suggestions
	}
> = {
	properties: {
		id: { ref: 'RegionEntryID' },
		name: { ref: 'Label' },
		source: { ref: 'Source' },
		summary: { ref: 'MarkdownString' },
		description: { ref: 'MarkdownString' },
		features: { elements: { ref: 'MarkdownString' } },
		quest_starter: { ref: 'MarkdownString' }
	},
	optionalProperties: { suggestions: { ref: 'Suggestions' } }
}
