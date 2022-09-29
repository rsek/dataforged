import type { OracleTableRow, YamlOracleSet, YamlOracleTable, YamlRowContentItem, YamlRowRoll, YamlSimpleTableRow } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'
import { KeysWithValuesOfType } from '@utils'


/**
 * @internal
 */
export interface YamlTemplateBase {
  _templateVars?: {
    [key: string]: string
  } | undefined
}

/**
 * @internal
 */
export interface YamlOracleSetTemplate extends Partial<Omit<YamlOracleSet, 'tables' | 'sets'>>, YamlTemplateBase {
  _templateOracleSet?: Partial<YamlOracleSet> | undefined
  tables?: {
    [key: SnakeCaseString]: YamlOracleTableTemplate
  } | undefined
  sets?: {
    [key: SnakeCaseString]: YamlOracleSetTemplate
  } | undefined
}

/**
 * @internal
 */
export interface YamlOracleTableTemplate extends Partial<YamlOracleTable>, YamlTemplateBase {
  _templateOracleTable?: Partial<YamlOracleTable> | undefined
  _templateTableRows?: YamlTemplateTable | undefined
}

/**
 * @internal
 */
export interface YamlTemplateTable {
  rolls: Array<YamlSimpleTableRow | YamlRowRoll>
  content: Array<YamlSimpleTableRow | YamlRowContentItem[] | string>
}
