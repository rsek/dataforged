import type * as Types from '@base-types'
import { type JTDSchemaType } from 'ajv/dist/core'

export const WorldTruth: JTDSchemaType<
	Types.Truths.WorldTruth,
	{
		WorldTruthOption: Types.Truths.WorldTruthOption
		ID: string
		Label: string
		Source: Types.Metadata.Source
		SvgImageURL: string
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'ID' },
		name: { ref: 'Label' },
		source: { ref: 'Source' },
		options: { elements: { ref: 'WorldTruthOption' } }
	},
	optionalProperties: {
		icon: { ref: 'SvgImageURL' },
		suggestions: { ref: 'Suggestions' }
	}
}

export const WorldTruthOption: JTDSchemaType<
	Types.Truths.WorldTruthOption,
	{
		ID: string
		Label: string
		MarkdownString: string
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'ID' },
		description: { ref: 'MarkdownString' },
		quest_starter: { ref: 'MarkdownString' }
	}
}

export const SettingTruth: JTDSchemaType<
	Types.Truths.SettingTruth,
	{
		ID: string
		Label: string
		Source: Types.Metadata.Source
		SettingTruthOption: Types.Truths.SettingTruthOption
		SvgImageURL: string
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'ID' },
		name: { ref: 'Label' },
		source: { ref: 'Source' },
		options: { elements: { ref: 'SettingTruthOption' } }
	},
	optionalProperties: {
		icon: { ref: 'SvgImageURL' },
		suggestions: { ref: 'Suggestions' }
	}
}

export const SettingTruthOption: JTDSchemaType<
	Types.Truths.SettingTruthOption,
	{
		ID: string
		Label: string
		MarkdownString: string
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'ID' },
		summary: { ref: 'MarkdownString' },
		description: { ref: 'MarkdownString' },
		quest_starter: { ref: 'MarkdownString' }
	}
}
