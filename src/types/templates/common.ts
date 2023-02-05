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
