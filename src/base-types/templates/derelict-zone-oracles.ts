import { type Oracles } from '@base-types'
import {
	type DescriptorFocusRow,
	type ActionThemeRow,
	type RollTwiceRow,
	type OracleTable5
} from 'base-types/templates/common'

export interface DerelictZoneOracles extends Oracles.OracleCollection {
	contents: {
		areas: DerelictZoneAreaOracle
		feature: DerelictZoneFeatureOracle
		peril: DerelictZonePerilOracle
		opportunity: DerelictZoneOpportunityOracle
	}
}

export interface NewZoneRow<
	Low extends number = number,
	High extends number = number
> extends Oracles.OracleTableRow<Low, High> {
	result: 'New zone'
	// # game_objects: *obj:DerelictZone.Access
}

export interface NewZoneViaAccessRow<
	Low extends number = number,
	High extends number = number
> extends Oracles.OracleTableRow<Low, High> {
	result: 'New zone via [⏵Access](starforged/collections/oracles/derelicts/access)'
	// # game_objects: *obj:DerelictZone
}

export interface DerelictZoneAreaOracle extends Oracles.OracleTable {
	summary: 'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](starforged/moves/exploration/undertake_an_expedition), an area can serve as a waypoint in your survey of the derelict.'
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
		NewZoneRow<81, 85>,
		NewZoneViaAccessRow<86, 100>
	]
}

export interface DerelictZoneFeatureOracle extends Oracles.OracleTable {
	summary: 'Roll on this table when you want to reveal new aspects of your current surroundings. This is best used sparingly—a bit of occasional extra detail or ambiance—rather than rolling for every segment of your exploration.'
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
		DescriptorFocusRow<89, 100>
	]
}

export interface DerelictZonePerilOracle extends Oracles.OracleTable {
	summary: 'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.'
	table: [
		Oracles.OracleTableRow<1, 10>,
		Oracles.OracleTableRow<11, 20>,
		Oracles.OracleTableRow<21, 30>,
		Oracles.OracleTableRow<31, 40>,
		Oracles.OracleTableRow<41, 50>,
		Oracles.OracleTableRow<51, 60>,
		Oracles.OracleTableRow<61, 70>,
		Oracles.OracleTableRow<71, 80>,
		Oracles.OracleTableRow<81, 90>,
		ActionThemeRow<91, 98>,
		RollTwiceRow<99, 100>
	]
}

export interface DerelictZoneOpportunityOracle extends OracleTable5 {
	_template: 'DerelictZoneOpportunityOracle'
	summary: 'Roll on this table when you want inspiration for a beneficial encounter or event within a derelict, such as when you roll a strong hit with a match as you [Undertake an Expedition](starforged/moves/exploration/undertake_an_expedition), or if you [Explore a Waypoint](starforged/moves/exploration/explore_a_waypoint) and find an opportunity.'
}
