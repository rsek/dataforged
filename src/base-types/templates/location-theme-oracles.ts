import { type OracleCollection } from '@base-types/collections'
import { type OracleTableRow, type OracleTable } from '@base-types/oracles'
import {
	type DescriptorFocusRow,
	type ActionThemeRow,
	type RollTwiceRow,
	type OracleTable5
} from '@base-types/templates/common'

export interface LocationThemeOracles extends OracleCollection {
	contents: {
		feature: LocationThemeFeatureOracle
		peril: LocationThemePerilOracle
		opportunity: LocationThemeOpportunityOracle
	}
}

interface LocationThemeFeatureOracle extends OracleTable {
	summary: 'Use this table to reveal a new aspect of the location.'
	table: [
		OracleTableRow<1, 8>,
		OracleTableRow<9, 16>,
		OracleTableRow<17, 24>,
		OracleTableRow<25, 32>,
		OracleTableRow<33, 40>,
		OracleTableRow<41, 48>,
		OracleTableRow<49, 56>,
		OracleTableRow<57, 64>,
		OracleTableRow<65, 72>,
		OracleTableRow<73, 80>,
		OracleTableRow<81, 88>,
		OracleTableRow<89, 96>,
		DescriptorFocusRow<97, 100>
	]
}
interface LocationThemePerilOracle extends OracleTable {
	summary: 'Use this table to help envision a complication or hazard.'
	table: [
		OracleTableRow<1, 9>,
		OracleTableRow<10, 18>,
		OracleTableRow<19, 27>,
		OracleTableRow<28, 36>,
		OracleTableRow<37, 45>,
		OracleTableRow<46, 54>,
		OracleTableRow<55, 63>,
		OracleTableRow<64, 72>,
		OracleTableRow<73, 81>,
		OracleTableRow<82, 90>,
		ActionThemeRow<91, 98>,
		RollTwiceRow<99, 100>
	]
}

interface LocationThemeOpportunityOracle extends OracleTable5 {
	summary: 'Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.'
}
