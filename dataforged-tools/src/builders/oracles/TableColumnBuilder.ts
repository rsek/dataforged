import { NodeBuilder } from '@builders/NodeBuilder.js'
import { TableColumnType } from '@schema'
import type { OracleTableDisplay, TableColumnRoll, TableColumnText, YamlTableColumnRoll, YamlTableColumnText } from '@schema'

/**
 * @internal
 */
// @ts-expect-error
export class TableColumnTextBuilder extends NodeBuilder<YamlTableColumnText, TableColumnText, OracleTableDisplay> implements TableColumnText {
  readonly column_type = TableColumnType.String
  label: TableColumnText['label']
  content: TableColumnText['content']
  key: TableColumnText['key']
  constructor (yaml: YamlTableColumnText, key: string, parent: OracleTableDisplay) {
    // @ts-expect-error
    super(yaml, ['columns', key], parent)
    this.label = yaml.label ?? 'result'
    this.content = yaml.content ?? parent.$id
    this.key = yaml.key ?? 'result'
  }
}

/**
 * @internal
 */
// @ts-expect-error
export class TableColumnRollBuilder extends NodeBuilder<YamlTableColumnRoll, TableColumnRoll, OracleTableDisplay> implements TableColumnRoll {
  readonly column_type = TableColumnType.DiceRange
  label: string
  content: TableColumnRoll['content']
  constructor (yaml: YamlTableColumnRoll, key: string, parent: OracleTableDisplay) {
    // @ts-expect-error
    super(yaml, `columns/${key}`, parent)
    this.label = yaml.label ?? 'roll'
    this.content = yaml.content ?? 'FIXME'
  }
}
