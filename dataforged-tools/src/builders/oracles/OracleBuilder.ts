import { NodeBuilder, OracleUsageBuilder, SourceBuilder, SourceInheritorBuilder, TitleBuilder } from '@builders'
import type { Game, MixinId, MixinSource, Oracle, OracleDisplayBase, OracleSet, OracleTable, OracleTableRow, OracleUsage, RowNullStub, Source, Title, YamlOracleSet, YamlOracleSetTemplate, YamlOracleTable, YamlOracleTableTemplate, YamlTitle } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'
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
export abstract class OracleBuilder<TYamlIn extends (YamlOracleSet | YamlOracleSetTemplate | YamlOracleTable | YamlOracleTableTemplate) & { table?: YamlOracleTable['table'] | undefined }, TJsonOut extends Oracle, TParent extends MixinId & MixinSource> extends NodeBuilder<TYamlIn, TJsonOut, TParent> implements Oracle {
  readonly _fragment!: string
  readonly _parent!: TParent
  readonly _rawData!: TYamlIn
  title: Title
  ancestors: Array<OracleSet['$id']>
  source!: Source
  aliases?: string[] | undefined
  display: OracleDisplayBase
  summary?: string | undefined
  description?: string | undefined
  usage?: OracleUsage | undefined
  tables?: { [key: SnakeCaseString]: OracleTable } | undefined
  sets?: { [key: SnakeCaseString]: OracleSet } | undefined
  table?: Array<OracleTableRow | RowNullStub> | undefined
  constructor(
    yaml: TYamlIn,
    fragment: string,
    parent: TParent
  ) {
    let jsonClone = _.cloneDeep(yaml)
    const jsonOracleSet = jsonClone as Required<YamlOracleSetTemplate>
    const jsonOracleTable = jsonClone as Required<YamlOracleTableTemplate>
    if (jsonOracleSet._templateOracleSet) {
      jsonClone = templateOracle<YamlOracleSet>(jsonOracleSet, jsonOracleSet._templateOracleSet) as TYamlIn
    }
    if (jsonOracleTable._templateOracleTable) {
      jsonClone = templateOracle<YamlOracleTable>(jsonOracleTable, jsonOracleTable._templateOracleTable) as TYamlIn
    }
    if (jsonOracleTable._templateTableRows) {
      jsonClone.table = templateTableRows(jsonOracleTable._templateTableRows) as typeof jsonClone.table
    }

    super(jsonClone, fragment, parent)

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
