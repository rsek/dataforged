import type { OracleDisplayBase, OracleUsage, TableColumnRoll, TableColumnText, YamlRequirements, YamlRollTemplate, YamlStub, YamlSuggestions } from '@schema'

/**
 * @internal
 */
export interface YamlOracleUsage extends YamlStub<OracleUsage, '', 'Suggestions'|'Requires'|'Roll template'> {
  Suggestions?: YamlSuggestions | undefined
  Requires?: YamlRequirements | undefined
  'Roll template'?: YamlRollTemplate | undefined
}

/**
 * @internal
 */
export interface YamlTableColumnText extends YamlStub<TableColumnText, 'Label' | 'Key'|'Content'> { }

/**
 * @internal
 */
export interface YamlTableColumnRoll extends YamlStub<TableColumnRoll, 'Label'|'Content'> { }

/**
 * @internal
 */
export interface YamlOracleDisplayBase extends YamlStub<OracleDisplayBase, '', 'Columns'> {
  Columns?: Array<YamlTableColumnText | YamlTableColumnRoll> | undefined
}

/**
 * @internal
 */
export interface YamlOracleTableDisplay extends YamlOracleDisplayBase {
}

/**
 * @internal
 */
export interface YamlOracleSetDisplay extends Omit<YamlOracleDisplayBase, 'Column of'|'Embed in'> {
}
