import type * as Types from '@base-types'
import { type JTDSchemaType } from 'ajv/dist/core'
import * as JSONSchema from '@schema-json'
import { toJtdId } from 'json-typedef/utils'

export const DelveSiteThemeID = toJtdId(JSONSchema.DelveSites.DelveSiteThemeID)

export const DelveSiteDomainID = toJtdId(
	JSONSchema.DelveSites.DelveSiteDomainID
)

export const DelveSiteTheme: JTDSchemaType<
	Types.DelveSites.DelveSiteTheme,
	{
		DelveSiteThemeID: string
		Source: Types.Metadata.Source
		MarkdownString: string
		Label: string
		SvgImageURL: string
		FeatureOrDanger: Types.DelveSites.FeatureOrDanger<number, number>
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'DelveSiteThemeID' },
		name: { ref: 'Label' },
		card_type: {
			enum: ['theme'],
			metadata: {
				typescriptType: "'theme'"
			}
		},
		source: { ref: 'Source' },
		summary: { ref: 'MarkdownString' },
		// @ts-expect-error
		features: {
			elements: { ref: 'FeatureOrDanger' },
			metadata: {
				typescriptType: `[
        FeatureOrDanger & {low: 1, high: 4},
        FeatureOrDanger & {low: 5, high: 8},
        FeatureOrDanger & {low: 9, high: 12},
        FeatureOrDanger & {low: 13, high: 16},
        FeatureOrDanger & {low: 17, high: 20}
      ]`
			}
		},
		// @ts-expect-error
		dangers: {
			elements: { ref: 'FeatureOrDanger' },
			metadata: {
				typescriptType: `[
        FeatureOrDanger & {low: 1, high: 5},
        FeatureOrDanger & {low: 6, high: 10},
        FeatureOrDanger & {low: 11, high: 12},
        FeatureOrDanger & {low: 13, high: 14},
        FeatureOrDanger & {low: 15, high: 16},
        FeatureOrDanger & {low: 17, high: 18},
        FeatureOrDanger & {low: 19, high: 20},
        FeatureOrDanger & {low: 21, high: 22},
        FeatureOrDanger & {low: 23, high: 24},
        FeatureOrDanger & {low: 25, high: 26},
        FeatureOrDanger & {low: 27, high: 28},
        FeatureOrDanger & {low: 29, high: 30}
      ]`
			}
		}
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
		DelveSiteDomainID: string
		Source: Types.Metadata.Source
		MarkdownString: string
		Label: string
		SvgImageURL: string
		FeatureOrDanger: Types.DelveSites.FeatureOrDanger<number, number>
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'DelveSiteDomainID' },
		name: { ref: 'Label' },
		card_type: {
			enum: ['domain'],
			metadata: {
				typescriptType: "'domain'"
			}
		},
		source: { ref: 'Source' },
		summary: { ref: 'MarkdownString' },
		// @ts-expect-error
		features: {
			elements: { ref: 'FeatureOrDanger' },
			metadata: {
				typescriptType: `[
          FeatureOrDanger & {low: 21, high: 43},
          FeatureOrDanger & {low: 44, high: 56},
          FeatureOrDanger & {low: 57, high: 64},
          FeatureOrDanger & {low: 65, high: 68},
          FeatureOrDanger & {low: 69, high: 72},
          FeatureOrDanger & {low: 73, high: 76},
          FeatureOrDanger & {low: 77, high: 80},
          FeatureOrDanger & {low: 81, high: 84},
          FeatureOrDanger & {low: 85, high: 88},
          FeatureOrDanger & {low: 89, high: 98},
          FeatureOrDanger & {low: 99, high: 99},
          FeatureOrDanger & {low: 100, high: 100}
        ]`
			}
		},
		// @ts-expect-error
		dangers: {
			elements: { ref: 'FeatureOrDanger' },
			metadata: {
				typescriptType: `[
      FeatureOrDanger & {low: 31, high: 33},
      FeatureOrDanger & {low: 34, high: 36},
      FeatureOrDanger & {low: 37, high: 39},
      FeatureOrDanger & {low: 40, high: 42},
      FeatureOrDanger & {low: 43, high: 45}
    ]`
			}
		}
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
