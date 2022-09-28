
import { OracleBuilder, OracleSetDisplayBuilder, OracleTableBuilder } from '@builders'
import type { OracleBase, OracleSet, OracleSetDisplay, OracleTable, Source, YamlOracleSet, YamlOracleTable } from '@schema'
import { propagateToChildren } from '@utils/object_transform/propagateToChildren.js'
import _ from 'lodash-es'

/**
 * @internal
 */
export class OracleSetBuilder extends OracleBuilder implements OracleSet {
  Display: OracleSetDisplay
  Tables?: {[key: string]: OracleTable} | undefined
  Sets?: {[key: string]: OracleSet} | undefined
  constructor (
    json: YamlOracleSet,
    fragment: string,
    parentId: OracleBase['$id'],
    parentSource: Source
  ) {
    super(json, fragment, parentId, parentSource)
    const yamlData = this.yamlData as YamlOracleSet
    this.Display = new OracleSetDisplayBuilder(this.yamlData.Display ?? {}, this)
    this['Sample Names'] = yamlData['Sample names']
    if (yamlData.Tables != null) {
      this.Tables = _.mapValues(yamlData.Tables, (oracleTable, tableFragment) => {
        if (yamlData.Usage != null) {
          propagateToChildren(yamlData.Usage, 'Usage', oracleTable)
        }
        if (yamlData.Requires != null) {
          propagateToChildren(yamlData.Requires, 'Requires', oracleTable)
        }
        return new OracleTableBuilder(oracleTable as YamlOracleTable, tableFragment, this.$id, parentSource)
      })
    }
    if (yamlData.Sets != null) {
      this.Sets = _.mapValues(yamlData.Sets,
        (oracleSet, setFragment) => {
          if (yamlData.Usage != null) {
            propagateToChildren(yamlData.Usage, 'Usage', oracleSet)
          }
          if (yamlData.Requires != null) {
            propagateToChildren(yamlData.Requires, 'Requires', oracleSet)
          }
          return new OracleSetBuilder(oracleSet as YamlOracleSet, setFragment, this.$id, parentSource)
        }
      )
    }
  }
}
