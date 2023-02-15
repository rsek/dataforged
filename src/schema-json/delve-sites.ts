import { type JSONSchemaType as Schema } from 'ajv'
import _ from 'lodash'
import {
	type Localize,
	type Metadata,
	type DelveSites as Types
} from '@base-types'
import { schemaRef } from './common'
import { type JSONSchema7Object } from 'json-schema'

export const DelveSiteID: Schema<Types.DelveSiteID> = {
	type: 'string',
	$comment: '{namespace}/delve_sites/{delveSite}',
	pattern: /^[a-z0-9][a-z0-9_]+\/delve_sites(\/[a-z][a-z_]*[a-z]){1}$/.source,
	examples: ['ironsworn_delve/delve_sites/alvas_rest']
}

export const DelveSiteCardType: Schema<Types.DelveSiteCardType> = {
	type: 'string',
	enum: ['theme', 'domain']
}

function denizenRow(
	low: number,
	high: number,
	frequency: Types.DelveSiteDenizenFrequency
): JSONSchema7Object {
	return {
		type: 'object',
		properties: {
			frequency: {
				const: frequency
			},
			low: {
				const: low
			},
			high: {
				const: high
			}
		}
	}
}

export const DelveSite: Schema<Types.DelveSite> = {
	type: 'object',
	description: 'A delve site with a theme, domain, and denizen table.',
	required: ['name', 'rank', 'theme', 'domain', 'denizens', 'source', '_id'],
	properties: {
		name: { $ref: '#/definitions/Label' },
		rank: { $ref: '#/definitions/ChallengeRank' },
		theme: { $ref: '#/definitions/DelveSiteThemeID' },
		domain: { $ref: '#/definitions/DelveSiteDomainID' },
		denizens: {
			allOf: [
				{ type: 'array', items: { $ref: '#/definitions/DelveSiteDenizen' } },
				{
					type: 'array',
					minItems: 12,
					maxItems: 12,
					items: [
						denizenRow(1, 27, 'very_common'),
						denizenRow(28, 41, 'common'),
						denizenRow(42, 55, 'common'),
						denizenRow(56, 69, 'common'),
						denizenRow(70, 75, 'uncommon'),
						denizenRow(76, 81, 'uncommon'),
						denizenRow(82, 87, 'uncommon'),
						denizenRow(88, 93, 'uncommon'),
						denizenRow(94, 95, 'rare'),
						denizenRow(96, 97, 'rare'),
						denizenRow(98, 99, 'rare'),
						denizenRow(100, 100, 'unforeseen')
					]
				}
			]
		} as any,
		source: schemaRef<Metadata.Source>('Source'),
		_id: { $ref: '#/definitions/DelveSiteID' },

		suggestions: schemaRef<Metadata.SuggestionsBase>('Suggestions')
	}
}

export const DelveSiteDenizen: Schema<
	Types.DelveSiteDenizen<number, number, Types.DelveSiteDenizenFrequency>
> = {
	type: 'object',
	description: 'A denizen entry in a delve site.',
	required: ['encounter', 'frequency', 'low', 'high'],
	properties: {
		encounter: {
			description:
				'The ID of the relevant encounter, or `null` if no encounter has been specified.',
			oneOf: [{ $ref: '#/definitions/EncounterClassicID' }, { type: 'null' }]
		} as any,
		name: { $ref: '#/definitions/Label' },
		frequency: {
			title: 'Frequency keyword',
			type: 'string',
			enum: ['very_common', 'common', 'uncommon', 'rare', 'unforeseen']
		},
		low: { type: 'integer', minimum: 1, maximum: 100 },
		high: { type: 'integer', minimum: 1, maximum: 100 }
	}
}

function staticFeatureDangerRow<
	T extends Types.FeatureOrDanger<number, number, string>
>(row: Omit<T, '_id'>): Schema<T> {
	const emptyRow: any = {
		type: 'object',
		properties: { low: { const: row.low }, high: { const: row.high } }
	}
	if (!_.isEmpty(row.result))
		emptyRow.properties.result = {
			...schemaRef<Localize.MarkdownPhrase>('MarkdownPhrase'),
			default: row.result
		}
	if (row.suggestions != null)
		emptyRow.properties.suggestions = {
			...schemaRef<Metadata.SuggestionsBase>('Suggestions'),
			default: row.suggestions
		}

	return emptyRow as Schema<T>
}

export const DelveSiteCard = {
	description: 'Schema shared by delve site themes and delve site domains.',
	type: 'object',
	additionalProperties: false,
	required: [
		'card_type',
		'name',
		'summary',
		'features',
		'dangers',
		'source',
		'_id'
	],
	properties: {
		_id: { type: 'string' },
		name: { $ref: '#/definitions/Label' },
		card_type: { $ref: '#/definitions/DelveSiteCardType' },
		icon: { $ref: '#/definitions/Icon' },
		summary: { $ref: '#/definitions/MarkdownSentences' },
		source: schemaRef<Metadata.Source>('Source'),
		description: { $ref: '#/definitions/MarkdownParagraphs' },
		features: {
			type: 'array',
			items: {
				$ref: '#/definitions/OracleTableRow'
			}
		},
		dangers: {
			type: 'array',
			items: {
				$ref: '#/definitions/OracleTableRow'
			}
		}
	}
}

export const DelveSiteThemeID: Schema<Types.DelveSiteThemeID> = {
	type: 'string',
	$comment: '{namespace}/site_themes/{siteTheme}',
	pattern: /^[a-z0-9][a-z0-9_]+\/site_themes(\/[a-z][a-z_]*[a-z]){1}$/.source
}

export const DelveSiteTheme: Schema<Types.DelveSiteTheme> = {
	type: 'object',
	description: 'A delve site theme card.',
	allOf: [
		{ $ref: '#/definitions/DelveSiteCard' },
		{
			properties: {
				_id: { $ref: '#/definitions/DelveSiteThemeID' },
				card_type: { const: 'theme' },
				features: {
					type: 'array',
					minItems: 5,
					maxItems: 5,
					items: [
						staticFeatureDangerRow<Types.DelveSiteTheme['features'][0]>({
							low: 1,
							high: 4,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['features'][1]>({
							low: 5,
							high: 8,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['features'][2]>({
							low: 9,
							high: 12,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['features'][3]>({
							low: 13,
							high: 16,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['features'][4]>({
							low: 17,
							high: 20,
							result: ''
						})
					]
				},
				dangers: {
					type: 'array',
					minItems: 12,
					maxItems: 12,
					items: [
						staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][0]>({
							low: 1,
							high: 5,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][1]>({
							low: 6,
							high: 10,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][2]>({
							low: 11,
							high: 12,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][3]>({
							low: 13,
							high: 14,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][4]>({
							low: 15,
							high: 16,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][5]>({
							low: 17,
							high: 18,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][6]>({
							low: 19,
							high: 20,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][7]>({
							low: 21,
							high: 22,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][8]>({
							low: 23,
							high: 24,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][9]>({
							low: 25,
							high: 26,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][10]>({
							low: 27,
							high: 28,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][11]>({
							low: 29,
							high: 30,
							result: ''
						})
					]
				}
			}
		}
	]
} as any

export const DelveSiteDomainID: Schema<Types.DelveSiteDomainID> = {
	type: 'string',
	$comment: '{namespace}/site_domains/{siteDomain}',
	pattern: /^[a-z0-9][a-z0-9_]+\/site_domains(\/[a-z][a-z_]*[a-z]){1}$/.source
}
export const DelveSiteDomain: Schema<Types.DelveSiteDomain> = {
	type: 'object',
	description: 'A delve site domain card.',
	allOf: [
		{ $ref: '#/definitions/DelveSiteCard' },
		{
			properties: {
				_id: { $ref: '#/definitions/DelveSiteDomainID' },
				card_type: { const: 'domain' },
				features: {
					type: 'array',
					minItems: 12,
					maxItems: 12,
					items: [
						staticFeatureDangerRow<Types.DelveSiteDomain['features'][0]>({
							low: 21,
							high: 43,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['features'][1]>({
							low: 44,
							high: 56,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['features'][2]>({
							low: 57,
							high: 64,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['features'][3]>({
							low: 65,
							high: 68,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['features'][4]>({
							low: 69,
							high: 72,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['features'][5]>({
							low: 73,
							high: 76,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['features'][6]>({
							low: 77,
							high: 80,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['features'][7]>({
							low: 81,
							high: 84,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['features'][8]>({
							low: 85,
							high: 88,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['features'][9]>({
							low: 89,
							high: 98,
							result: 'Something unusual or unexpected',
							suggestions: {
								oracles: [
									'ironsworn/oracles/action_and_theme/action',
									'ironsworn/oracles/action_and_theme/theme',
									'ironsworn_delve/oracles/feature/aspect',
									'ironsworn_delve/oracles/feature/focus'
								]
							}
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['features'][10]>({
							low: 99,
							high: 99,
							result: 'You transition into a new theme',
							suggestions: {
								oracles: ['ironsworn_delve/oracles/site_nature/theme']
							}
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['features'][11]>({
							low: 100,
							high: 100,
							result: 'You transition into a new domain',
							suggestions: {
								oracles: ['ironsworn_delve/oracles/site_nature/domain']
							}
						})
					]
				},
				dangers: {
					type: 'array',
					minItems: 5,
					maxItems: 5,
					items: [
						staticFeatureDangerRow<Types.DelveSiteDomain['dangers'][0]>({
							low: 31,
							high: 33,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['dangers'][1]>({
							low: 34,
							high: 36,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['dangers'][2]>({
							low: 37,
							high: 39,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['dangers'][3]>({
							low: 40,
							high: 42,
							result: ''
						}),
						staticFeatureDangerRow<Types.DelveSiteDomain['dangers'][4]>({
							low: 43,
							high: 45,
							result: ''
						})
					]
				}
			}
		}
	]
} as any
