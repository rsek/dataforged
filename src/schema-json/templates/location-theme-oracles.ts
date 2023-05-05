import { type LocationThemeOracles as TemplateTypes } from 'schema/templates'
import { type PartialSchema } from 'ajv/dist/types/json-schema'
import {
	descriptorFocusRow,
	actionThemeRow,
	rollTwiceRow,
	toTemplateSchema
} from './common'

const LocationThemeFeatureOraclePartial: PartialSchema<TemplateTypes.LocationThemeFeatureOracle> =
	toTemplateSchema(
		{
			table: [
				{ low: 1, high: 8 },
				{ low: 9, high: 16 },
				{ low: 17, high: 24 },
				{ low: 25, high: 32 },
				{ low: 33, high: 40 },
				{ low: 41, high: 48 },
				{ low: 49, high: 56 },
				{ low: 57, high: 64 },
				{ low: 65, high: 72 },
				{ low: 73, high: 80 },
				{ low: 81, high: 88 },
				{ low: 89, high: 96 },
				{ ...descriptorFocusRow, low: 97, high: 100 }
			]
		},
		'LocationThemeFeatureOracle',
		{
			title: { canonical: 'Feature' },
			summary: 'Use this table to reveal a new aspect of the location.'
		}
	) as any

const LocationThemePerilOraclePartial: PartialSchema<TemplateTypes.LocationThemePerilOracle> =
	toTemplateSchema(
		{
			table: [
				{ low: 1, high: 9 },
				{ low: 10, high: 18 },
				{ low: 19, high: 27 },
				{ low: 28, high: 36 },
				{ low: 37, high: 45 },
				{ low: 46, high: 54 },
				{ low: 55, high: 63 },
				{ low: 64, high: 72 },
				{ low: 73, high: 81 },
				{ low: 82, high: 90 },
				{ ...actionThemeRow, low: 91, high: 98 },
				{ ...rollTwiceRow, low: 99, high: 100 }
			]
		},
		'LocationThemePerilOracle',
		{
			title: { canonical: 'Peril' },
			summary: 'Use this table to help envision a complication or hazard.'
		}
	) as any

const LocationThemeOpportunityOraclePartial: PartialSchema<TemplateTypes.LocationThemeOpportunityOracle> =
	toTemplateSchema(
		{
			table: [
				{ low: 1, high: 20 },
				{ low: 21, high: 40 },
				{ low: 41, high: 60 },
				{ low: 61, high: 80 },
				{ low: 81, high: 100 }
			]
		},
		'LocationThemeOpportunityOracle',
		{
			title: {
				canonical: 'Opportunity',
				summary:
					'Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.'
			}
		}
	) as any

export const LocationThemeOraclesPartial: PartialSchema<TemplateTypes.LocationThemeOracles> =
	{
		type: 'object',
		required: ['_template', 'contents'],
		properties: {
			_template: { type: 'string', const: 'LocationThemeOracles' },
			contents: {
				type: 'object',
				properties: {
					feature: LocationThemeFeatureOraclePartial,
					peril: LocationThemePerilOraclePartial,
					opportunity: LocationThemeOpportunityOraclePartial
				}
			}
		}
	} as any
