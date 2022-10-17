import type { OracleMatch, OracleTable, OracleTableRow, YamlOracleTableDisplay, YamlOracleUsage, YamlRequirements, YamlRollTemplate, YamlStub, YamlStubNode, YamlTitleCaseTitle } from '@schema'

/**
 * @internal
 */
export interface YamlOracleTable extends YamlStubNode<OracleTable, 'ancestors', 'table' | 'usage' | 'display' | 'on_a_match' | 'requires'> {
  title: YamlTitleCaseTitle
  usage?: YamlOracleUsage | undefined
  requires?: YamlRequirements | undefined
  display?: YamlOracleTableDisplay | undefined
  table?: YamlRowLike[] | YamlRowRoll[] | undefined
  on_a_match?: Omit<OracleMatch, '$id'>
}

/**
 * @internal
 */
export type YamlRowRoll<Floor extends number | null = number | null, Ceiling extends number | null = number | null> = [Floor, Ceiling]
/**
 * @internal
 */
export type YamlRowContentItem = Partial<YamlOracleTableRow> | string

/**
 * @internal
 */
export type YamlSimpleTableRow<Floor extends number | null = number | null, Ceiling extends number | null = number | null> = [...YamlRowRoll<Floor, Ceiling>, ...YamlRowContentItem[]]
/**
 * @internal
 */
export interface YamlOracleTableRow<Floor extends number | null = number | null, Ceiling extends number | null = number | null> extends Omit<YamlStub<OracleTableRow<Floor, Ceiling>>, '$id' | 'roll_template'> {
  roll_template?: YamlRollTemplate | undefined
}
/**
 * @internal
 */
export type YamlRowLike<Floor extends number | null = number | null, Ceiling extends number | null = number | null> = YamlOracleTableRow<Floor, Ceiling> | YamlSimpleTableRow<Floor, Ceiling>
