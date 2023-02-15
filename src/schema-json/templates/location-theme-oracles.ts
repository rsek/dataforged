import { type LocationThemeOracles as TemplateTypes } from 'base-types/templates'
import { type PartialSchema } from 'ajv/dist/types/json-schema'
import {
	staticRow,
	descriptorFocusRow,
	actionThemeRow,
	rollTwiceRow
} from './common'
import { schemaRef } from 'schema-json/common'
import { type Title } from 'base-types/metadata'

const LocationThemeFeatureOraclePartial: PartialSchema<TemplateTypes.LocationThemeFeatureOracle> =
	{
		type: 'object',
		properties: {
			title: {
				...schemaRef<Title>('Title'),
				default: {
					canonical: 'Feature'
				}
			},
			_template: {
				type: 'string',
				const: 'LocationThemeFeatureOracle'
			},
			summary: {
				type: 'string',
				default: 'Use this table to reveal a new aspect of the location.'
			},
			table: {
				type: 'array',
				minItems: 13,
				maxItems: 13,
				items: [
					staticRow(1, 8),
					staticRow(9, 16),
					staticRow(17, 24),
					staticRow(25, 32),
					staticRow(33, 40),
					staticRow(41, 48),
					staticRow(49, 56),
					staticRow(57, 64),
					staticRow(65, 72),
					staticRow(73, 80),
					staticRow(81, 88),
					staticRow(89, 96),
					descriptorFocusRow(97, 100)
				]
			}
		}
	}

const LocationThemePerilOraclePartial: PartialSchema<TemplateTypes.LocationThemePerilOracle> =
	{
		type: 'object',
		properties: {
			title: {
				...schemaRef<Title>('Title'),
				default: {
					canonical: 'Peril'
				}
			},
			_template: {
				type: 'string',
				const: 'LocationThemePerilOracle'
			},
			summary: {
				type: 'string',
				default: 'Use this table to help envision a complication or hazard.'
			},
			table: {
				type: 'array',
				minItems: 12,
				maxItems: 12,
				items: [
					staticRow(1, 9),
					staticRow(10, 18),
					staticRow(19, 27),
					staticRow(28, 36),
					staticRow(37, 45),
					staticRow(46, 54),
					staticRow(55, 63),
					staticRow(64, 72),
					staticRow(73, 81),
					staticRow(82, 90),
					actionThemeRow(91, 98),
					rollTwiceRow(99, 100)
				]
			}
		}
	}

const LocationThemeOpportunityOraclePartial: PartialSchema<TemplateTypes.LocationThemeOpportunityOracle> =
	{
		type: 'object',
		properties: {
			title: {
				...schemaRef<Title>('Title'),
				default: {
					canonical: 'Opportunity'
				}
			},
			_template: {
				type: 'string',
				const: 'LocationThemeOpportunityOracle'
			},
			summary: {
				type: 'string',
				default:
					'Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.'
			},
			table: {
				type: 'array',
				minItems: 5,
				maxItems: 5,
				items: [
					staticRow(1, 20),
					staticRow(21, 40),
					staticRow(41, 60),
					staticRow(61, 80),
					staticRow(81, 100)
				]
			}
		}
	}

export const LocationThemeOraclesPartial: PartialSchema<TemplateTypes.LocationThemeOracles> =
	{
		type: 'object',
		required: ['_template', 'contents'],
		properties: {
			_template: { const: 'LocationThemeOracles' },
			contents: {
				type: 'object',
				properties: {
					feature: LocationThemeFeatureOraclePartial,
					peril: LocationThemePerilOraclePartial,
					opportunity: LocationThemeOpportunityOraclePartial
				}
			}
		}
	}
