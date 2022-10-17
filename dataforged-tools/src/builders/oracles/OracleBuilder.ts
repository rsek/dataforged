import type { NodeLike } from '@builders'
import { NodeBuilder, OracleUsageBuilder, TitleBuilder } from '@builders'
import type { Oracle, OracleDisplayBase, OracleSet, OracleTable, OracleTableRow, OracleUsage, Title, YamlOracleSet, YamlOracleSetTemplate, YamlOracleTable, YamlOracleTableTemplate, YamlTitle } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'
import { formatId } from '@utils'
import { extractAncestors } from '@utils/extractAncestors.js'
import { buildLog } from '@utils/logging/buildLog.js'
import { templateOracle } from '@utils/object_transform/templateOracle.js'
import { templateTableRows } from '@utils/object_transform/templateOracleTable.js'
import _ from 'lodash-es'

/**
 * @see {@link OracleSet}, {@link OracleTable}
 * @internal
 */
export abstract class OracleBuilder<TYamlIn extends (YamlOracleSet | YamlOracleSetTemplate | YamlOracleTable | YamlOracleTableTemplate), TJsonOut extends Oracle, TParent extends NodeLike<any>> extends NodeBuilder<TYamlIn, TJsonOut, TParent> implements Oracle {
  readonly _fragments!: string[]
  readonly _parent!: TParent
  readonly _rawData!: TYamlIn
  title: Title
  ancestors: OracleSet['$id'][]
  aliases?: string[] | undefined
  display: OracleDisplayBase
  summary?: string | undefined
  description?: string | undefined
  usage?: OracleUsage | undefined
  tables?: { [key: SnakeCaseString]: OracleTable } | undefined
  sets?: { [key: SnakeCaseString]: OracleSet } | undefined
  table?: (OracleTableRow)[] | undefined
  constructor (
    yaml: TYamlIn,
    fragment: string,
    parent: TParent
  ) {
    let jsonClone = _.cloneDeep(yaml)
    const jsonOracleSet = jsonClone as Required<YamlOracleSetTemplate>
    const jsonOracleTable = jsonClone as Required<YamlOracleTableTemplate>
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (jsonOracleSet._templateOracleSet) {
      jsonClone = templateOracle<YamlOracleSet>(jsonOracleSet, jsonOracleSet._templateOracleSet) as TYamlIn
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (jsonOracleTable._templateOracleTable) {
      jsonClone = templateOracle<YamlOracleTable>(jsonOracleTable, jsonOracleTable._templateOracleTable) as TYamlIn
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (jsonOracleTable._templateTableRows) {
      (jsonClone as YamlOracleTableTemplate).table = templateTableRows(jsonOracleTable._templateTableRows)
    }

    super(jsonClone, parent, fragment)

    buildLog(this.constructor, `Building: ${this.$id}`)
    this.title = new TitleBuilder(jsonClone.title as YamlTitle, this)
    this.ancestors = extractAncestors(this.$id)
    // this is just so it's ordered nicely
    this.display = { $id: formatId('display', this.$id) }
    if (jsonClone.usage != null) {
      this.usage = new OracleUsageBuilder(jsonClone.usage, this)
    }
    // readonly data to be used by descendant classes
  }
}
