import { type Oracles } from '@base-types'
import {
	type PrecursorVaultRow,
	type DescriptorFocusRow
} from 'base-types/templates/common'

export interface PlanetOracles extends Oracles.OracleCollection {
	collections: {
		settlements: PlanetSettlementOracles
	}
	contents: {
		atmosphere: PlanetAtmosphereTable
		observed_from_space: PlanetObservedFromSpaceTable
		feature: PlanetsideFeatureTable
		life: PlanetLifeTable
	}
}
export interface PlanetSettlementTable extends Oracles.OracleTable {
	table: [
		Oracles.OracleTableRow<any, any, 'None'>,
		Oracles.OracleTableRow<any, any, 'Orbital settlement'>,
		Oracles.OracleTableRow<any, any, 'Planetside settlement'>,
		Oracles.OracleTableRow<any, any, 'Multiple settlements'>,
		Oracles.OracleTableRow<any, any, 'Settlements in conflict'>
	]
}
export interface PlanetAtmosphereTable extends Oracles.OracleTable {
	table: [
		Oracles.OracleTableRow<any, any, 'None/thin'>,
		Oracles.OracleTableRow<any, any, 'Toxic'>,
		Oracles.OracleTableRow<any, any, 'Corrosive'>,
		Oracles.OracleTableRow<any, any, 'Marginal'>,
		Oracles.OracleTableRow<any, any, 'Breathable'>,
		Oracles.OracleTableRow<any, any, 'Ideal'>
	]
}
export interface PlanetObservedFromSpaceTable extends Oracles.OracleTable {
	table: [
		Oracles.OracleTableRow<1, 11>,
		Oracles.OracleTableRow<12, 22>,
		Oracles.OracleTableRow<23, 33>,
		Oracles.OracleTableRow<34, 44>,
		Oracles.OracleTableRow<45, 55>,
		Oracles.OracleTableRow<56, 66>,
		Oracles.OracleTableRow<67, 77>,
		Oracles.OracleTableRow<78, 88>,
		DescriptorFocusRow<89, 98>,
		PrecursorVaultRow<99, 100, 'orbital'>
	]
}
export interface PlanetsideFeatureTable extends Oracles.OracleTable {
	table: [
		Oracles.OracleTableRow<1, 7>,
		Oracles.OracleTableRow<8, 14>,
		Oracles.OracleTableRow<15, 21>,
		Oracles.OracleTableRow<22, 28>,
		Oracles.OracleTableRow<29, 35>,
		Oracles.OracleTableRow<36, 42>,
		Oracles.OracleTableRow<43, 49>,
		Oracles.OracleTableRow<50, 56>,
		Oracles.OracleTableRow<57, 63>,
		Oracles.OracleTableRow<64, 70>,
		Oracles.OracleTableRow<71, 77>,
		Oracles.OracleTableRow<78, 84>,
		Oracles.OracleTableRow<85, 91>,
		DescriptorFocusRow<92, 98>,
		PrecursorVaultRow<99, 100, 'planetside'>
	]
}
export interface PlanetLifeTable extends Oracles.OracleTable {
	table: [
		Oracles.OracleTableRow<any, any, 'None'>,
		Oracles.OracleTableRow<any, any, 'Extinct'>,
		Oracles.OracleTableRow<any, any, 'Scarce'>,
		Oracles.OracleTableRow<any, any, 'Diverse'>,
		Oracles.OracleTableRow<any, any, 'Bountiful'>,
		Oracles.OracleTableRow<any, any, 'Overrun'>
	]
}
export interface PlanetSettlementOracles extends Oracles.OracleCollection {
	contents: {
		terminus: PlanetSettlementTable
		outlands: PlanetSettlementTable
		expanse: PlanetSettlementTable
	}
}
