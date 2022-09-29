import type { OracleDisplayBase, OracleUsage, TableColumnRoll, TableColumnText, YamlRequirements, YamlRollTemplate, YamlStub, YamlSuggestions } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'

/**
 * @internal
 */
export interface YamlOracleUsage extends YamlStub<OracleUsage, '', 'suggestions' | 'requires' | 'roll_template'> {
  suggestions?: YamlSuggestions | undefined
  requires?: YamlRequirements | undefined
  roll_template?: YamlRollTemplate | undefined
}

/**
 * @internal
 */
export interface YamlTableColumnText extends YamlStub<TableColumnText, 'label' | 'key' | 'content'> {
  /**
   * The key of the table (in the parent {@link OracleSet.tables}) to use the content of.
   */
  _tableKey?: string | undefined
}

/**
 * @internal
 */
export interface YamlTableColumnRoll extends YamlStub<TableColumnRoll, 'label' | 'content'> {
  /**
   * The key of the table (in the parent {@link OracleSet.tables}) to use the content of.
   */
  _tableKey?: string | undefined
}

/**
 * @internal
 */
export interface YamlOracleDisplayBase extends YamlStub<OracleDisplayBase, '', 'columns'> {
  columns?: { [key: SnakeCaseString]: YamlTableColumnText | YamlTableColumnRoll } | undefined
}

/**
 * @internal
 */
export interface YamlOracleTableDisplay extends YamlOracleDisplayBase {
}

/**
 * @internal
 */
export interface YamlOracleSetDisplay extends Omit<YamlOracleDisplayBase, 'column_of' | 'embed_in'> {
}
