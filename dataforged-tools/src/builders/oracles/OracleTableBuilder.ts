
import { OracleBuilder, OracleContentBuilder, OracleTableDisplayBuilder, OracleTableRowBuilder, RowNullStubBuilder } from '@builders'
import type { AttributeKey, OracleContent, OracleSet, OracleTable, OracleTableDisplay, OracleTableRow, RowNullStub, Source, YamlOracleSet, YamlOracleTable, YamlOracleTableTemplate, YamlRowLike, YamlSimpleTableRow, YamlStub } from '@schema'
import { AttributeMap, formatId } from '@utils'
import _ from 'lodash'

/**
 * @internal
 */
export class OracleTableBuilder extends OracleBuilder<YamlOracleTable, OracleTable, OracleSet> implements OracleTable {
  display: OracleTableDisplay
  content?: OracleContent | undefined
  on_a_match?: OracleTable['on_a_match'] | undefined
  table: Array<OracleTableRow | RowNullStub>
  constructor (
    yaml: YamlOracleTable,
    fragment: string,
    parent: OracleSet
  ) {
    super(
      yaml, fragment, parent)
    this.display = new OracleTableDisplayBuilder(this._rawData.display ?? {}, this)
    if (this._rawData.content != null) {
      this.content = new OracleContentBuilder(this._rawData.content)
    }
    if (this._rawData.on_a_match != null) {
      this.on_a_match = { $id: formatId('on_a_match', this.$id), ...this._rawData.on_a_match }
    }
    const tableData = (this._rawData as Required<YamlOracleTable>).table

    this.table = tableData.map((row: YamlRowLike, index) => {
      // TODO: propagate attributes to row objects
      let newRow: OracleTableRowBuilder | RowNullStubBuilder
      if (Array.isArray(row)) {
        if (row[0] === null && row[1] === null) {
          const filteredRow = row.filter(item => typeof item === 'string') as string[]
          newRow = new RowNullStubBuilder({ result: filteredRow[0], summary: filteredRow[1] })
        } else {
          newRow = new OracleTableRowBuilder(row, index, this)
        }
      } else if (typeof row === 'object') {
        if (row.floor === null && row.ceiling === null) {
          newRow = new RowNullStubBuilder(row)
        } else {
          newRow = new OracleTableRowBuilder(row, index, this)
        }
      } else { throw new Error(`Unable to infer row type from row at index ${index} of ${this.$id}`) }
      return newRow
    })

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
  static inferSetsAttributes (table: Array<OracleTableRow | RowNullStub>) {
    const mapped = _(table).map(row => row.sets_attributes).toArray().compact().value()
    return _.merge(...mapped as [AttributeMap, AttributeMap])
  }
}
