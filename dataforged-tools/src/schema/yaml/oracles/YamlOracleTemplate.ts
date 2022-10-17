import type { YamlOracleSet, YamlOracleTable, YamlRowContentItem, YamlRowRoll, YamlSimpleTableRow } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'

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
  rolls: (YamlSimpleTableRow | YamlRowRoll)[]
  content: (YamlSimpleTableRow | YamlRowContentItem[] | string)[]
}
