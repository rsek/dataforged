import type * as Types from '@base-types'
import { type JTDSchemaType } from 'ajv/dist/core'
import { toJtdId } from 'json-typedef/utils'
import {
	WorldTruthID as ClassicID,
	WorldTruthOptionID as ClassicOptionID
} from 'schema-json/ruleset-classic'

import {
	SettingTruthID as SfID,
	SettingTruthOptionID as SfOptionID
} from 'schema-json/ruleset-starforged'

export const WorldTruthID = toJtdId(ClassicID)

export const WorldTruthOptionID = toJtdId(ClassicOptionID)

export const SettingTruthID = toJtdId(SfID)

export const SettingTruthOptionID = toJtdId(SfOptionID)

export const WorldTruth: JTDSchemaType<
	Types.Truths.WorldTruth,
	{
		WorldTruthOption: Types.Truths.WorldTruthOption
		WorldTruthID: string
		Label: string
		Source: Types.Metadata.Source
		SvgImageURL: string
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'WorldTruthID' },
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
		WorldTruthOptionID: string
		Label: string
		MarkdownString: string
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'WorldTruthOptionID' },
		description: { ref: 'MarkdownString' },
		quest_starter: { ref: 'MarkdownString' }
	}
}

export const SettingTruth: JTDSchemaType<
	Types.Truths.SettingTruth,
	{
		SettingTruthID: string
		Label: string
		Source: Types.Metadata.Source
		SettingTruthOption: Types.Truths.SettingTruthOption
		SvgImageURL: string
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'SettingTruthID' },
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
		SettingTruthOptionID: string
		Label: string
		MarkdownString: string
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'SettingTruthOptionID' },
		summary: { ref: 'MarkdownString' },
		description: { ref: 'MarkdownString' },
		quest_starter: { ref: 'MarkdownString' }
	}
}
