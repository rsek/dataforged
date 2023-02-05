import { type OracleCollection } from 'src/types/collections'
import {
  type OracleTableRow,
  type OracleTable,
  type OracleTableRoll,
  type OracleTableRollMethod
} from 'src/types/oracles'

export interface RollTwiceRow<
  Low extends number,
  High extends number,
  Method extends OracleTableRollMethod = 'no_duplicates'
> extends OracleTableRow<Low, High> {
  result: 'Roll twice'
  rolls: [OracleTableRoll<string, 2, Method>]
}

export type LocationType = 'orbital' | 'planetside' | 'deep_space'

export interface PrecursorVaultRow<
  Low extends number,
  High extends number,
  Location extends Exclude<LocationType, 'deep_space'> = Exclude<
    LocationType,
    'deep_space'
  >
> extends OracleTableRow<Low, High> {
  result: `Precursor Vault (${Location})`
}

export interface DescriptorFocusRow<Low extends number, High extends number>
  extends OracleTableRow<Low, High> {
  result: 'Descriptor + Focus'
  rolls: [
    { oracle: 'starforged/oracles/core/descriptor' },
    { oracle: 'starforged/oracles/core/focus' }
  ]
}

export interface ActionThemeRow<Low extends number, High extends number>
  extends OracleTableRow<Low, High> {
  result: 'Action + Theme'
  rolls: [
    { oracle: 'starforged/oracles/core/action' },
    { oracle: 'starforged/oracles/core/theme' }
  ]
}

export interface OracleTable5 extends OracleTable {
  table: [
    OracleTableRow<1, 20>,
    OracleTableRow<21, 40>,
    OracleTableRow<41, 60>,
    OracleTableRow<61, 80>,
    OracleTableRow<81, 100>
  ]
}
export interface OracleTable10 extends OracleTable {
  table: [
    OracleTableRow<1, 10>,
    OracleTableRow<11, 20>,
    OracleTableRow<21, 30>,
    OracleTableRow<31, 40>,
    OracleTableRow<41, 50>,
    OracleTableRow<51, 60>,
    OracleTableRow<61, 70>,
    OracleTableRow<71, 80>,
    OracleTableRow<81, 90>,
    OracleTableRow<91, 100>
  ]
}
export interface OracleTable20 extends OracleTable {
  table: [
    OracleTableRow<1, 5>,
    OracleTableRow<6, 10>,
    OracleTableRow<11, 15>,
    OracleTableRow<16, 20>,
    OracleTableRow<21, 25>,
    OracleTableRow<26, 30>,
    OracleTableRow<31, 35>,
    OracleTableRow<36, 40>,
    OracleTableRow<41, 45>,
    OracleTableRow<46, 50>,
    OracleTableRow<51, 55>,
    OracleTableRow<56, 60>,
    OracleTableRow<61, 65>,
    OracleTableRow<66, 70>,
    OracleTableRow<71, 75>,
    OracleTableRow<76, 80>,
    OracleTableRow<81, 85>,
    OracleTableRow<86, 90>,
    OracleTableRow<91, 95>,
    OracleTableRow<96, 100>
  ]
}

export interface OpportunityOracle extends OracleTable5 {}

interface LocationThemeFeatures extends OracleTable {
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
    DescriptorFocusRow<97, 100> // descriptor + focus
  ]
}

interface LocationThemePerils extends OracleTable {
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

export interface LocationThemeOracles extends OracleCollection {
  contents: {
    feature: LocationThemeFeatures
    peril: LocationThemePerils
    opportunity: OpportunityOracle
  }
}

interface DerelictZoneFeatures extends OracleTable {
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
    DescriptorFocusRow<89, 100>
  ]
}

interface DerelictZonePerils extends OracleTable {
  table: [
    OracleTableRow<1, 10>,
    OracleTableRow<11, 20>,
    OracleTableRow<21, 30>,
    OracleTableRow<31, 40>,
    OracleTableRow<41, 50>,
    OracleTableRow<51, 60>,
    OracleTableRow<61, 70>,
    OracleTableRow<71, 80>,
    OracleTableRow<81, 90>,
    ActionThemeRow<91, 98>,
    RollTwiceRow<99, 100>
  ]
}

export interface DerelictZoneOracles extends OracleCollection {
  contents: {
    feature: DerelictZoneFeatures
    peril: DerelictZonePerils
    opportunity: OpportunityOracle
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
