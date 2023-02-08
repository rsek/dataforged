import { type OracleCollection } from '@base-types/collections'
import { type OracleTableRow, type OracleTable } from '@base-types/oracles'
import {
  type DescriptorFocusRow,
  type PrecursorVaultRow
} from '@base-types/templates/common'

export interface PlanetOracles extends OracleCollection {
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
interface PlanetSettlementTable extends OracleTable {
  table: [
    OracleTableRow<any, any, 'None'>,
    OracleTableRow<any, any, 'Orbital settlement'>,
    OracleTableRow<any, any, 'Planetside settlement'>,
    OracleTableRow<any, any, 'Multiple settlements'>,
    OracleTableRow<any, any, 'Settlements in conflict'>
  ]
}
interface PlanetAtmosphereTable extends OracleTable {
  table: [
    OracleTableRow<any, any, 'None/thin'>,
    OracleTableRow<any, any, 'Toxic'>,
    OracleTableRow<any, any, 'Corrosive'>,
    OracleTableRow<any, any, 'Marginal'>,
    OracleTableRow<any, any, 'Breathable'>,
    OracleTableRow<any, any, 'Ideal'>
  ]
}
interface PlanetObservedFromSpaceTable extends OracleTable {
  table: [
    OracleTableRow<1, 11>,
    OracleTableRow<12, 22>,
    OracleTableRow<23, 33>,
    OracleTableRow<34, 44>,
    OracleTableRow<45, 55>,
    OracleTableRow<56, 66>,
    OracleTableRow<67, 77>,
    OracleTableRow<78, 88>,
    DescriptorFocusRow<89, 98>,
    PrecursorVaultRow<99, 100, 'orbital'>
  ]
}
interface PlanetsideFeatureTable extends OracleTable {
  table: [
    OracleTableRow<1, 7>,
    OracleTableRow<8, 14>,
    OracleTableRow<15, 21>,
    OracleTableRow<22, 28>,
    OracleTableRow<29, 35>,
    OracleTableRow<36, 42>,
    OracleTableRow<43, 49>,
    OracleTableRow<50, 56>,
    OracleTableRow<57, 63>,
    OracleTableRow<64, 70>,
    OracleTableRow<71, 77>,
    OracleTableRow<78, 84>,
    OracleTableRow<85, 91>,
    DescriptorFocusRow<92, 98>,
    PrecursorVaultRow<99, 100, 'planetside'>
  ]
}
interface PlanetLifeTable extends OracleTable {
  table: [
    OracleTableRow<any, any, 'None'>,
    OracleTableRow<any, any, 'Extinct'>,
    OracleTableRow<any, any, 'Scarce'>,
    OracleTableRow<any, any, 'Diverse'>,
    OracleTableRow<any, any, 'Bountiful'>,
    OracleTableRow<any, any, 'Overrun'>
  ]
}
interface PlanetSettlementOracles extends OracleCollection {
  contents: {
    terminus: PlanetSettlementTable
    outlands: PlanetSettlementTable
    expanse: PlanetSettlementTable
  }
}
