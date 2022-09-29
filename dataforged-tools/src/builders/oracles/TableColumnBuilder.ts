import { OracleTableDisplay, TableColumnType, YamlTableColumnRoll, YamlTableColumnText } from '@schema'
import type { OracleTable, TableColumnRoll, TableColumnText } from '@schema'
import { formatId } from '@utils'
import { NodeBuilder } from '@builders/NodeBuilder.js'

/**
 * @internal
 */
export class TableColumnTextBuilder extends NodeBuilder<YamlTableColumnText, TableColumnText, OracleTableDisplay> implements TableColumnText {
  readonly column_type = TableColumnType.String
  label: TableColumnText['label']
  content: TableColumnText['content']
  key: TableColumnText['key']
  constructor (yaml: YamlTableColumnText, key: string, parent: OracleTableDisplay) {
    super(yaml, `columns/${key}`, parent)
    this.label = yaml.label ?? 'result'
    this.content = yaml.content ?? parent.$id
    this.key = yaml.key ?? 'result'
  }
}

/**
 * @internal
 */
export class TableColumnRollBuilder extends NodeBuilder<YamlTableColumnRoll, TableColumnRoll, OracleTableDisplay> implements TableColumnRoll {
  readonly column_type = TableColumnType.DiceRange
  label: string
  content: TableColumnRoll['content']
  constructor (yaml: YamlTableColumnRoll, key: string, parent: OracleTableDisplay) {
    let str
    super(yaml, `columns/${key}`, parent)
    this.label = yaml.label ?? 'roll'
    this.content = yaml.content ?? 'FIXME'
  }
}
