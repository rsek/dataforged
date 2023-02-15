import { type Oracles } from '@base-types'
import {
	type ActionThemeRow,
	type RollTwiceRow,
	type DescriptorFocusRow,
	type OracleTable5
} from 'base-types/templates/common'

export interface LocationThemeOracles extends Oracles.OracleCollection {
	_template: 'LocationThemeOracles'
	contents: {
		feature: LocationThemeFeatureOracle
		peril: LocationThemePerilOracle
		opportunity: LocationThemeOpportunityOracle
	}
}

export interface LocationThemeFeatureOracle extends Oracles.OracleTable {
	_template: 'LocationThemeFeatureOracle'
	summary: 'Use this table to reveal a new aspect of the location.'
	table: [
		Oracles.OracleTableRow<1, 8>,
		Oracles.OracleTableRow<9, 16>,
		Oracles.OracleTableRow<17, 24>,
		Oracles.OracleTableRow<25, 32>,
		Oracles.OracleTableRow<33, 40>,
		Oracles.OracleTableRow<41, 48>,
		Oracles.OracleTableRow<49, 56>,
		Oracles.OracleTableRow<57, 64>,
		Oracles.OracleTableRow<65, 72>,
		Oracles.OracleTableRow<73, 80>,
		Oracles.OracleTableRow<81, 88>,
		Oracles.OracleTableRow<89, 96>,
		DescriptorFocusRow<97, 100>
	]
}
export interface LocationThemePerilOracle extends Oracles.OracleTable {
	_template: 'LocationThemePerilOracle'
	summary: string
	table: [
		Oracles.OracleTableRow<1, 9>,
		Oracles.OracleTableRow<10, 18>,
		Oracles.OracleTableRow<19, 27>,
		Oracles.OracleTableRow<28, 36>,
		Oracles.OracleTableRow<37, 45>,
		Oracles.OracleTableRow<46, 54>,
		Oracles.OracleTableRow<55, 63>,
		Oracles.OracleTableRow<64, 72>,
		Oracles.OracleTableRow<73, 81>,
		Oracles.OracleTableRow<82, 90>,
		ActionThemeRow<91, 98>,
		RollTwiceRow<99, 100>
	]
}

export interface LocationThemeOpportunityOracle extends OracleTable5 {
	_template: 'LocationThemeOpportunityOracle'
	summary: string
}
