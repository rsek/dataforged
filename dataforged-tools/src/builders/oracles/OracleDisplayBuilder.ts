import { DisplayBuilder, TableColumnRollBuilder, TableColumnTextBuilder } from '@builders'
import { TableColumnType } from '@schema'
import type { OracleDisplayBase, OracleSet, OracleSetDisplay, OracleTable, OracleTableDisplay, OracleTableRow, TableColumnRoll, TableColumnText, YamlOracleDisplayBase, YamlOracleSetDisplay, YamlOracleTableDisplay } from '@schema'
import { formatId } from '@utils'
import _, { cloneDeep } from 'lodash-es'
import { SnakeCaseString } from '@schema/json/common/String.js'

/**
 * @internal
 */
export abstract class OracleDisplayBuilder extends DisplayBuilder implements OracleDisplayBase {
  $id: string
  column_of?: OracleTable['$id'] | undefined
  columns?: OracleDisplayBase['columns']
  embed_in?: OracleTableRow['$id'] | undefined
  buildColumns<DT extends YamlOracleSetDisplay | YamlOracleTableDisplay, PT extends OracleTable | OracleSet>(json: DT, parent: PT) {
    // const rollColumns: Record<string, TableColumnRoll> = { roll: {} }
    // const defaultColumns = cloneDeep(json.columns)
    // const columns = _.map(defaultColumns, (col, key) => {
    //   if (key === 0 && col.column_type !== TableColumnType.DiceRange) {
    //     throw new Error(`${parent.$id} doesn't have a roll column as its first column: ${JSON.stringify(defaultColumns)}`)
    //   }
    //   switch (col.column_type) {
    //     case TableColumnType.DiceRange:
    //       return new TableColumnRollBuilder(col, col.label, this as OracleTableDisplay)
    //     case TableColumnType.String:
    //       return new TableColumnTextBuilder(col, key, this as OracleTableDisplay)
    //   }
    // })
    // if (columns.length !== new Set(columns.map(col => col.label)).size) {
    //   throw new Error(`${parent.$id}'s column labels aren't unique ${JSON.stringify(columns)}`)
    // }
    // return columns
  }

  constructor(yaml: YamlOracleDisplayBase, parent: OracleTable | OracleSet) {
    super(yaml)
    this.$id = formatId('display', parent.$id)
    this.column_of = yaml.column_of
    this.embed_in = yaml.embed_in
  }
}

/**
 * @internal
 */
export class OracleTableDisplayBuilder extends OracleDisplayBuilder implements OracleTableDisplay {
  column_of?: OracleTable['$id'] | undefined
  columns!: { [key: SnakeCaseString]: TableColumnRoll | TableColumnText }
  constructor(yaml: YamlOracleTableDisplay, parent: OracleTable) {
    super(yaml, parent)
    // this.columns = this.buildColumns(yaml, parent)
  }
}

/**
 * @internal
 */
export class OracleSetDisplayBuilder extends OracleDisplayBuilder implements OracleSetDisplay {
  constructor(yaml: YamlOracleSetDisplay, parent: OracleSet) {
    super(yaml, parent)
    if (yaml.columns != null) {
      // this.columns = this.buildColumns(yaml, parent)
    }
  }
}
