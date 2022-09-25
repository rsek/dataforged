import type { OracleSet, YamlOracleSetDisplay, YamlOracleSetTemplate, YamlOracleTable, YamlOracleTableTemplate, YamlOracleUsage, YamlRequirements, YamlSource  , YamlStubNode } from "@schema";


/**
 * @internal
 */
export interface YamlOracleSet extends YamlStubNode<OracleSet, "Ancestors","Requires"|"Usage"|"Tables"|"Sets"|"Display"|"Source"> {
  Requires?: YamlRequirements | undefined;
  Display?: YamlOracleSetDisplay | undefined
  Usage?: YamlOracleUsage | undefined;
  Source: YamlSource;
  Sets?: {
    [key: string]: YamlOracleSet|YamlOracleSetTemplate
  } | undefined;
  Tables?: {
    [key: string]:YamlOracleTable | YamlOracleTableTemplate
  } | undefined;
}