import { type Oracles } from 'schema'

export interface RollTwiceRow<
	Low extends number = number,
	High extends number = number,
	Method extends Oracles.OracleTableRollMethod = 'no_duplicates'
> extends Oracles.OracleTableRow<Low, High> {
	_template: 'RollTwiceRow'
	result: 'Roll twice'
	rolls: [Oracles.OracleTableRoll<string, 2, Method>]
}

export type LocationType = 'orbital' | 'planetside' | 'deep_space'

export interface PrecursorVaultRow<
	Low extends number,
	High extends number,
	Location extends LocationType
> extends Oracles.OracleTableRow<Low, High> {
	result: `Precursor Vault (${Location})`
}

export interface DescriptorFocusRow<
	Low extends number = number,
	High extends number = number
> extends Oracles.OracleTableRow<Low, High> {
	_template: 'DescriptorFocusRow'
	result: '[⏵Descriptor](starforged/oracles/core/descriptor) + [Focus](starforged/oracles/core/focus)'
	rolls: [
		{ oracle: 'starforged/oracles/core/descriptor' },
		{ oracle: 'starforged/oracles/core/focus' }
	]
}

export interface ActionThemeRow<
	Low extends number = number,
	High extends number = number
> extends Oracles.OracleTableRow<Low, High> {
	_template: 'ActionThemeRow'
	result: '[⏵Action](starforged/oracles/core/action) + [Theme](starforged/oracles/core/theme)'
	rolls: [
		{ oracle: 'starforged/oracles/core/action' },
		{ oracle: 'starforged/oracles/core/theme' }
	]
}

export interface OracleTable5 extends Oracles.OracleTable {
	_template: string
	table: [
		Oracles.OracleTableRow<1, 20>,
		Oracles.OracleTableRow<21, 40>,
		Oracles.OracleTableRow<41, 60>,
		Oracles.OracleTableRow<61, 80>,
		Oracles.OracleTableRow<81, 100>
	]
}
export interface OracleTable10 extends Oracles.OracleTable {
	_template: string
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
		Oracles.OracleTableRow<91, 100>
	]
}
export interface OracleTable20 extends Oracles.OracleTable {
	_template: string
	table: [
		Oracles.OracleTableRow<1, 5>,
		Oracles.OracleTableRow<6, 10>,
		Oracles.OracleTableRow<11, 15>,
		Oracles.OracleTableRow<16, 20>,
		Oracles.OracleTableRow<21, 25>,
		Oracles.OracleTableRow<26, 30>,
		Oracles.OracleTableRow<31, 35>,
		Oracles.OracleTableRow<36, 40>,
		Oracles.OracleTableRow<41, 45>,
		Oracles.OracleTableRow<46, 50>,
		Oracles.OracleTableRow<51, 55>,
		Oracles.OracleTableRow<56, 60>,
		Oracles.OracleTableRow<61, 65>,
		Oracles.OracleTableRow<66, 70>,
		Oracles.OracleTableRow<71, 75>,
		Oracles.OracleTableRow<76, 80>,
		Oracles.OracleTableRow<81, 85>,
		Oracles.OracleTableRow<86, 90>,
		Oracles.OracleTableRow<91, 95>,
		Oracles.OracleTableRow<96, 100>
	]
}
