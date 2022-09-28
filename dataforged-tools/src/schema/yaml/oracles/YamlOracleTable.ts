import type { OracleMatch, OracleTable, OracleTableRow, YamlOracleTableDisplay, YamlOracleUsage, YamlRequirements, YamlStubNode } from '@schema'

/**
 * @internal
 */
export interface YamlOracleTable extends YamlStubNode<OracleTable, 'Ancestors', 'Tables'|'Table'|'Usage'|'Display'|'On a Match'> {
  Usage?: YamlOracleUsage | undefined
  Requires?: YamlRequirements | undefined
  Display?: YamlOracleTableDisplay | undefined
  Table?: YamlSimpleTableRow[] | YamlRowRoll[] | OracleTableRow[] | undefined
  'On a Match'?: Omit<OracleMatch, '$id'>
}

/**
 * @internal
 */
export type YamlRowRoll = [number | null, number | null]
/**
 * @internal
 */
export type YamlRowContentItem = object | string

/**
 * @internal
 */
export type YamlSimpleTableRow = [...YamlRowRoll, ...YamlRowContentItem[]]
