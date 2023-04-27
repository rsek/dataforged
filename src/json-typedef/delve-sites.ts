import type * as Types from '@base-types'
import { type JTDSchemaType } from 'ajv/dist/core'

export const DelveSiteTheme: JTDSchemaType<
	Types.DelveSites.DelveSiteTheme,
	{
		ID: string
		Source: Types.Metadata.Source
		MarkdownString: string
		Label: string
		SvgImageURL: string
		FeatureOrDanger: Types.DelveSites.FeatureOrDanger<number, number>
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'ID' },
		name: { ref: 'Label' },
		card_type: { enum: ['theme'] },
		source: { ref: 'Source' },
		summary: { ref: 'MarkdownString' },
		// @ts-expect-error
		features: { elements: { ref: 'FeatureOrDanger' } }, // TODO: type override for TS
		// @ts-expect-error
		dangers: { elements: { ref: 'FeatureOrDanger' } }
	},
	optionalProperties: {
		description: { ref: 'MarkdownString' },
		icon: { ref: 'SvgImageURL' },
		suggestions: { ref: 'Suggestions' }
	}
}

export const DelveSiteDomain: JTDSchemaType<
	Types.DelveSites.DelveSiteDomain,
	{
		ID: string
		Source: Types.Metadata.Source
		MarkdownString: string
		Label: string
		SvgImageURL: string
		FeatureOrDanger: Types.DelveSites.FeatureOrDanger<number, number>
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'ID' },
		name: { ref: 'Label' },
		card_type: { enum: ['domain'] },
		source: { ref: 'Source' },
		summary: { ref: 'MarkdownString' },
		// @ts-expect-error
		features: { elements: { ref: 'FeatureOrDanger' } },
		// @ts-expect-error
		dangers: { elements: { ref: 'FeatureOrDanger' } }
	},
	optionalProperties: {
		description: { ref: 'MarkdownString' },
		icon: { ref: 'SvgImageURL' },
		suggestions: { ref: 'Suggestions' }
	}
}

export const FeatureOrDanger: JTDSchemaType<
	Types.DelveSites.FeatureOrDanger<number, number>,
	{
		ID: string
		MarkdownString: string
		OracleRollTemplate: Types.Oracles.OracleRollTemplate
		SvgImageURL: string
		OracleTableRoll: Types.Oracles.OracleTableRoll
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'ID' },
		low: { type: 'uint8' },
		high: { type: 'uint8' },
		result: { ref: 'MarkdownString' }
	},
	optionalProperties: {
		summary: { ref: 'MarkdownString' },
		description: { ref: 'MarkdownString' },
		template: { ref: 'OracleRollTemplate' },
		icon: { ref: 'SvgImageURL' },
		rolls: { elements: { ref: 'OracleTableRoll' } },
		embed_table: { ref: 'ID' },
		suggestions: { ref: 'Suggestions' }
	}
}

export const DelveSiteDenizen: JTDSchemaType<
	Types.DelveSites.DelveSiteDenizen<
		number,
		number,
		Types.DelveSites.DelveSiteDenizenFrequency
	>,
	{
		ID: string
		Label: string
	}
> = {
	properties: {
		low: { type: 'uint8' },
		high: { type: 'uint8' },
		frequency: {
			enum: ['very_common', 'common', 'uncommon', 'rare', 'unforeseen']
		}
	},
	optionalProperties: {
		encounter: { ref: 'ID' },
		name: { ref: 'Label' }
	}
}
