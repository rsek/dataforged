import type { OracleSet, YamlOracleSetDisplay, YamlOracleSetTemplate, YamlOracleTable, YamlOracleTableTemplate, YamlOracleUsage, YamlRequirements, YamlSource, YamlStubNode, YamlTitleCaseTitle } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'

/**
 * @internal
 */
export interface YamlOracleSet extends YamlStubNode<OracleSet, 'ancestors', 'requires' | 'usage' | 'tables' | 'sets' | 'display' | 'source' | 'title'> {
  title: YamlTitleCaseTitle
  requires?: YamlRequirements | undefined
  display?: YamlOracleSetDisplay | undefined
  usage?: YamlOracleUsage | undefined
  source: YamlSource
  sets?: {
    [key: SnakeCaseString]: YamlOracleSet | YamlOracleSetTemplate
  } | undefined
  tables?: {
    [key: SnakeCaseString]: YamlOracleTable | YamlOracleTableTemplate
  } | undefined
}
