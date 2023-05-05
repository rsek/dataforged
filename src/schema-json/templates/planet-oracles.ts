import { type PlanetOracles as TemplateTypes } from 'schema/templates'
import { type DescriptorFocusRow } from 'schema/templates/common'
import _ from 'lodash'

import { type PartialSchema } from 'schema-json/clean-types'
import {
	descriptorFocusRow,
	toTemplateSchema
} from 'schema-json/templates/common'
import { type RecursivePartial } from '../../utils'

const planetSettlementOracleBase: RecursivePartial<TemplateTypes.PlanetSettlementTable> =
	{
		table: [
			{ result: 'None' },
			{ result: 'Orbital settlement' },
			{ result: 'Planetside settlement' },
			{ result: 'Multiple settlements' },
			{ result: 'Settlements in conflict' }
		]
	}

const planetSettlementOraclesBase: RecursivePartial<TemplateTypes.PlanetSettlementOracles> =
	{
		name: 'Settlements',
		contents: {
			terminus: {
				...planetSettlementOracleBase,
				name: 'Terminus'
			},
			outlands: {
				...planetSettlementOracleBase,
				name: 'Outlands'
			},
			expanse: {
				...planetSettlementOracleBase,
				name: 'Expanse'
			}
		}
	}

const atmosphereBase: RecursivePartial<TemplateTypes.PlanetAtmosphereTable> = {
	name: 'Atmosphere',
	table: [
		{ result: 'None / thin' },
		{ result: 'Toxic' },
		{ result: 'Corrosive' },
		{ result: 'Marginal' },
		{ result: 'Breathable' },
		{ result: 'Ideal' }
	]
}

const observedFromSpaceBase: RecursivePartial<TemplateTypes.ObservedFromSpace> =
	{
		name: 'Observed From Space',
		table: [
			{ low: 1, high: 11 },
			{ low: 12, high: 22 },
			{ low: 23, high: 33 },
			{ low: 34, high: 44 },
			{ low: 45, high: 55 },
			{ low: 56, high: 66 },
			{ low: 67, high: 77 },
			{ low: 78, high: 88 },
			{ ...descriptorFocusRow, low: 89, high: 98 },
			{ low: 99, high: 100, result: 'Precursor Vault (orbital)' }
		]
	}

const planetsideFeatureBase: RecursivePartial<TemplateTypes.PlanetsideFeatureTable> =
	{
		name: 'Planetside Feature',
		table: [
			{ low: 1, high: 7 },
			{ low: 8, high: 14 },
			{ low: 15, high: 21 },
			{ low: 22, high: 28 },
			{ low: 29, high: 35 },
			{ low: 36, high: 42 },
			{ low: 43, high: 49 },
			{ low: 50, high: 56 },
			{ low: 57, high: 63 },
			{ low: 64, high: 70 },
			{ low: 71, high: 77 },
			{ low: 78, high: 84 },
			{ low: 85, high: 91 },
			{
				...descriptorFocusRow,
				low: 92,
				high: 98
			} as Partial<DescriptorFocusRow<92, 98>>,
			{ low: 99, high: 100, result: 'Precursor Vault (planetside)' }
		]
	}

const lifeBase: RecursivePartial<TemplateTypes.PlanetLifeTable> = {
	name: 'Life',
	table: [
		{ result: 'None' },
		{ result: 'Extinct' },
		{ result: 'Scarce' },
		{ result: 'Diverse' },
		{ result: 'Bountiful' },
		{ result: 'Overrun' }
	]
}

export const PlanetOraclesPartial: PartialSchema<
	RecursivePartial<TemplateTypes.PlanetOracles>
> = _.merge(
	toTemplateSchema(
		{
			_template: 'PlanetOracles',
			collections: {
				settlements: planetSettlementOraclesBase
			},
			contents: {
				atmosphere: atmosphereBase,
				observed_from_space: observedFromSpaceBase,
				feature: planetsideFeatureBase,
				life: lifeBase
			}
		},
		'PlanetOracles'
	),
	{
		required: ['sample_names'],
		properties: { sample_names: { type: 'array', items: { type: 'string' } } }
	}
)
