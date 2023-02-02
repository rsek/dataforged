
import type { NodeBuilder, NodeLike } from '@builders'
import { OracleBuilder, OracleSetDisplayBuilder, OracleTableBuilder } from '@builders'
import type { OracleSet, OracleSetDisplay, OracleTable, YamlOracleSet, YamlOracleSetTemplate, YamlOracleTable } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'
import { propagateToChildren } from '@utils/object_transform/propagateToChildren.js'
import _ from 'lodash'

/**
 * @internal
 */
export class OracleSetBuilder<
  TYamlIn extends YamlOracleSet | YamlOracleSetTemplate = YamlOracleSet | YamlOracleSetTemplate,
  TParent extends NodeLike<any> = NodeLike<typeof OracleSetBuilder>
  > extends OracleBuilder<
  TYamlIn,
  OracleSet,
  TParent
  > implements OracleSet, NodeBuilder<TYamlIn, OracleSet, TParent> {
  display: OracleSetDisplay
  tables?: { [key: SnakeCaseString]: OracleTable } | undefined
  sets?: { [key: SnakeCaseString]: OracleSet } | undefined
  sample_names?: string[] | []
  constructor (
    yaml: TYamlIn,
    fragment: string,
    parent: TParent
  ) {
    super(yaml, fragment, parent)
    const yamlData = this._rawData as YamlOracleSet
    this.display = new OracleSetDisplayBuilder(this._rawData.display ?? {}, this)
    this.sample_names = yamlData.sample_names
    if (yamlData.tables != null) {
      this.tables = _.mapValues(yamlData.tables, (oracleTable, tableFragment) => {
        if (yamlData.usage != null) {
          propagateToChildren(yamlData.usage, 'usage', oracleTable)
        }
        if (yamlData.requires != null) {
          propagateToChildren(yamlData.requires, 'requires', oracleTable)
        }
        return new OracleTableBuilder(oracleTable as YamlOracleTable, tableFragment, this)
      })
    }
    if (yamlData.sets != null) {
      this.sets = _.mapValues(yamlData.sets,
        (oracleSet, setFragment) => {
          if (yamlData.usage != null) {
            propagateToChildren(yamlData.usage, 'usage', oracleSet)
          }
          if (yamlData.requires != null) {
            propagateToChildren(yamlData.requires, 'requires', oracleSet)
          }
          return new OracleSetBuilder<YamlOracleSet, typeof this>(oracleSet as YamlOracleSet, setFragment, this)
        }
      )
    }
  }
}
