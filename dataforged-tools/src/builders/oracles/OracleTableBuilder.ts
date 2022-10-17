
import type { NodeLike, OracleSetBuilder } from '@builders'
import { OracleBuilder, OracleContentBuilder, OracleTableDisplayBuilder, OracleTableRowBuilder } from '@builders'
import type { OracleContent, OracleTable, OracleTableDisplay, OracleTableRow, YamlOracleTable, YamlRowLike } from '@schema'
import type { AttributeMap } from '@utils'
import { formatId } from '@utils'
import _ from 'lodash-es'

/**
 * @internal
 */
export class OracleTableBuilder<TParent extends NodeLike<any> = OracleSetBuilder> extends OracleBuilder<YamlOracleTable, OracleTable, TParent> implements OracleTable {
  display: OracleTableDisplay
  content?: OracleContent | undefined
  on_a_match?: OracleTable['on_a_match'] | undefined
  table: (OracleTableRow)[]
  constructor (
    yaml: YamlOracleTable,
    fragment: string,
    parent: TParent
  ) {
    super(
      yaml, fragment, parent)
    this.display = new OracleTableDisplayBuilder(this._rawData.display ?? {}, this)
    if (this._rawData.content != null) {
      this.content = new OracleContentBuilder(this._rawData.content)
    }
    if (this._rawData.on_a_match != null) {
      this.on_a_match = { $id: formatId(this.$id, 'on_a_match'), ...this._rawData.on_a_match }
    }
    const tableData = (this._rawData as Required<YamlOracleTable>).table

    this.table = tableData.map((row: YamlRowLike, index) => new OracleTableRowBuilder(row, index, this))

    const attrs = OracleTableBuilder.inferSetsAttributes(this.table)
    if (Object.keys(attrs).length > 0) {
      if (this.usage == null) {
        this.usage = {}
      }
      if (typeof this.usage.sets_attributes === 'undefined') {
        this.usage.sets_attributes = {}
      }
      this.usage.sets_attributes = _.merge(this.usage.sets_attributes ?? {}, attrs)
    }
  }

  /**
   * Infers a SetsAttributes object for an Oracle from its table rows.
   * @param table - The table of data to infer attributes from.
   * @returns An array of objects with a single property called Key.
   */
  static inferSetsAttributes (table: (OracleTableRow)[]): AttributeMap {
    const mapped = _.compact(_.map(table, row => row.set_attributes))

    return _.merge(...mapped as [AttributeMap, AttributeMap])
  }
}
