import type * as Types from '@base-types'
import { type JTDSchemaType } from 'ajv/dist/core'

export const EncounterNatureStarforged: JTDSchemaType<string> = {
	type: 'string'
}

export const EncounterNatureClassic: JTDSchemaType<string> = {
	type: 'string'
}

export const ChallengeRank: JTDSchemaType<number> = {
	type: 'uint8',
	metadata: {
		description:
			'Challenge rank represented as a number from 1 (troublesome) to 5 (epic)',
		typescriptType: '1 | 2 | 3 | 4 | 5'
	}
}

export const EncounterVariantStarforged: JTDSchemaType<
	Types.Encounters.EncounterVariantStarforged,
	{
		MarkdownString: string
		Label: string
		EncounterNatureStarforged: string
		ChallengeRank: number
		ID: string
	}
> = {
	properties: {
		id: { ref: 'ID' },
		name: { ref: 'Label' },
		nature: { ref: 'EncounterNatureStarforged' },
		rank: { ref: 'ChallengeRank' },
		description: { ref: 'MarkdownString' }
	}
}

export const EncounterStarforged: JTDSchemaType<
	Types.Encounters.EncounterStarforged,
	{
		MarkdownString: string
		Label: string
		EncounterNatureStarforged: string
		ChallengeRank: number
		ID: string
		Source: Types.Metadata.Source
		Suggestions: Types.Metadata.SuggestionsBase
		EncounterVariantStarforged: Types.Encounters.EncounterVariantStarforged
	}
> = {
	properties: {
		id: { ref: 'ID' },
		name: { ref: 'Label' },
		nature: { ref: 'EncounterNatureStarforged' },
		rank: { ref: 'ChallengeRank' },
		summary: { ref: 'MarkdownString' },
		description: { ref: 'MarkdownString' },
		source: { ref: 'Source' },
		drives: { elements: { ref: 'MarkdownString' } },
		features: { elements: { ref: 'MarkdownString' } },
		tactics: { elements: { ref: 'MarkdownString' } },
		quest_starter: { ref: 'MarkdownString' }
	},
	optionalProperties: {
		suggestions: { ref: 'Suggestions' },
		variants: { values: { ref: 'EncounterVariantStarforged' } }
	}
}
