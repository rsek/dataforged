import { LocationTheme, Region } from '@game_objects'
import { MultipleRolls, OracleTableRow, PartOfSpeechTag, YamlOracleSet, YamlOracleTable, YamlOracleTableRow, YamlRowLike, YamlSimpleTableRow, YamlStub, YamlTableColumnRoll } from '@schema'

/**
 * @internal
 */
export interface YamlOracleSetPlanet extends YamlOracleSet {

}
/**
 * @internal
 */
export interface YamlRepeatableOracleMixin extends Partial<YamlOracleTable> {
  content: {
    part_of_speech: [PartOfSpeechTag.Fragment]
  }
  usage: { repeatable: true }
}
/**
 * @internal
 */
export interface YamlFeatureMixin extends Partial<YamlRepeatableOracleMixin> {
  title: { canonical: 'Feature' }
}
/**
 * @internal
 */
export interface YamlPerilMixin extends Partial<YamlRepeatableOracleMixin> {
  title: { canonical: 'Peril' }
}
/**
 * @internal
 */
export interface YamlOpportunityMixin extends Partial<YamlRepeatableOracleMixin> {
  title: { canonical: 'Opportunity' }
  table: YamlTableByTwenty
}
/**
 * @internal
 */
export type YamlTableBySeven = [
  YamlRowLike<1, 7>,
  YamlRowLike<8, 14>,
  YamlRowLike<15, 21>,
  YamlRowLike<22, 28>,
  YamlRowLike<29, 35>,
  YamlRowLike<36, 42>,
  YamlRowLike<43, 49>,
  YamlRowLike<50, 56>,
  YamlRowLike<57, 63>,
  YamlRowLike<64, 70>,
  YamlRowLike<71, 77>,
  YamlRowLike<78, 84>,
  YamlRowLike<85, 91>,
  YamlRowLike<92, 98>, // descriptor/focus
  YamlRowLike<99, 100>
]
/**
 * @internal
 */
export type YamlTableStubByEight = [
  YamlRowLike<1, 8>,
  YamlRowLike<9, 16>,
  YamlRowLike<17, 24>,
  YamlRowLike<25, 32>,
  YamlRowLike<33, 40>,
  YamlRowLike<41, 48>,
  YamlRowLike<49, 56>,
  YamlRowLike<57, 64>,
  YamlRowLike<65, 72>,
  YamlRowLike<73, 80>,
]
/**
 * @internal
 */
export type YamlTableStubByNine = [
  YamlRowLike<1, 9>,
  YamlRowLike<10, 18>,
  YamlRowLike<19, 27>,
  YamlRowLike<28, 36>,
  YamlRowLike<37, 45>,
  YamlRowLike<46, 54>,
  YamlRowLike<55, 63>,
  YamlRowLike<64, 72>,
  YamlRowLike<73, 81>,
  YamlRowLike<82, 90>,
]
/**
 * @internal
 */
export type YamlTableStubByTen = [
  YamlRowLike<1, 10>,
  YamlRowLike<11, 20>,
  YamlRowLike<21, 30>,
  YamlRowLike<31, 40>,
  YamlRowLike<41, 50>,
  YamlRowLike<51, 60>,
  YamlRowLike<61, 70>,
  YamlRowLike<71, 80>,
  YamlRowLike<81, 90>,
]
/**
 * @internal
 */
export type YamlTableStubByEleven = [
  YamlRowLike<1, 11>,
  YamlRowLike<12, 22>,
  YamlRowLike<23, 33>,
  YamlRowLike<34, 44>,
  YamlRowLike<45, 55>,
  YamlRowLike<56, 66>,
  YamlRowLike<67, 77>,
  YamlRowLike<78, 88>,
  // descriptor/focus
  // precursor vault (orbital)
]
/**
 * @internal
 */
export type YamlTableByTwenty = [
  // e.g. zone opportunity
  YamlRowLike<1, 20>,
  YamlRowLike<21, 40>,
  YamlRowLike<41, 60>,
  YamlRowLike<61, 80>,
  YamlRowLike<81, 100>,
]
/**
 * @internal
 */
export type YamlRowContentOnly = Omit<YamlOracleTableRow, 'floor' | 'ceiling'>
/**
 * @internal
 */
export type YamlTableLocationMixin = [
  YamlRowContentOnly & { result: 'Orbital settlement', game_objects: {} },
  YamlRowContentOnly & { result: 'Planetside settlement', game_objects: {} },
  YamlRowContentOnly & { result: 'Multiple settlements', game_objects: {} },
  YamlRowContentOnly & { result: 'Settlements in conflict', game_objects: {} },
]
/**
 * @internal
 */
export type RegionName = keyof typeof Region

/**
 * @internal
 */
export interface YamlOracleSetSubtablesMixin<TEnum, TAttributeKey> extends YamlOracleSet {

}
/**
 * @internal
 */
export interface YamlRegionalSubtableMixin<TRegion extends RegionName> extends YamlOracleTable {
  title: {
    canonical: TRegion
  }
  usage: {
    requires: {
      attributes: {
        region: (typeof Region[TRegion])[]
      }
    }
  }
}
/**
 * @internal
 */
export interface YamlRegionSetMixin extends YamlOracleSet {
  tables: Record<Region, YamlRegionalSubtableMixin<RegionName>>
  requires: {
    attributes: {
      region: []
    }
  }
  display: {
    columns: {
      terminus: YamlTableColumnRoll & { label: 'Terminus' }
      outlands: YamlTableColumnRoll & { label: 'Outlands' }
      expanse: YamlTableColumnRoll & { label: 'Expanse' }
    }
  }
}
/**
 * @internal
 */
export interface YamlDescriptorFocusMixin extends YamlOracleTableRow {
  result: '[⏵Descriptor + Focus](starforged/oracles/core)'
  oracle_rolls: [
    'starforged/oracles/core/descriptor',
    'starforged/oracles/core/focus'
  ]
}
/**
 * @internal
 */
export interface YamlActionThemeMixin extends YamlOracleTableRow {
  result: '[⏵Action + Theme](starforged/oracles/core)'
  oracle_rolls: [
    'starforged/oracles/core/action',
    'starforged/oracles/core/theme'
  ]
}
/**
 * @internal
 */
export interface YamlRollTwiceMixin extends YamlOracleTableRow {
  multiple_rolls: {
    result: 'Roll twice'
    amount: 2
    allow_duplicates: false
    make_it_worse: false
  }
}
/**
 * @internal
 */
export interface YamlRollThreeTimesMixin extends YamlOracleTableRow {
  multiple_rolls: {
    result: 'Roll three times'
    amount: 3
    allow_duplicates: false
    make_it_worse: false
  }
}
/**
 * @internal
 */
export interface YamlRollTwiceRepeatsOkMixin extends YamlOracleTableRow {
  multiple_rolls: {
    result: 'Roll twice'
    amount: 2
    allow_duplicates: true
    make_it_worse: false
  }
}
/**
 * @internal
 */
export interface YamlRollTwiceMakeItWorse extends YamlOracleTableRow {
  multiple_rolls: {
    result: 'Roll twice'
    amount: 2
    allow_duplicates: true
    make_it_worse: true
  }
}
