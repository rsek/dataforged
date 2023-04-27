import type * as Types from '@base-types'
import { JTDSchemaType } from 'ajv/dist/core'

export const Rarity: JTDSchemaType<
	Types.Rarities.Rarity,
	{
		ID: string
		MarkdownString: string
		Label: string
		Source: Types.Metadata.Source
		SvgImageURL: string
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'ID' },
		name: { ref: 'Label' },
		asset: { ref: 'ID' },
		xp_cost: { type: 'uint8' },
		description: { ref: 'MarkdownString' },
		source: { ref: 'Source' }
	},
	optionalProperties: {
		icon: { ref: 'SvgImageURL' },
		suggestions: { ref: 'Suggestions' }
	}
}
