import type { IOracleSet, ISource } from "@json_out/index.js";
import type { IOracleSetDisplayYaml, IOracleTableYaml, IOracleUsageYaml, IRequirementsYaml, ITemplateOracleSetYaml, ITemplateYamlBase, YamlStubTitle } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IOracleSetYaml extends ITemplateYamlBase, YamlStubTitle<IOracleSet, "","Requires"|"Usage"|"Tables"|"Sets"|"Display"> {
  Requires?: IRequirementsYaml | undefined;
  Display?: IOracleSetDisplayYaml | undefined
  Usage?: IOracleUsageYaml | undefined;
  Source: Partial<ISource>;
  Sets?: IOracleSetYaml[] | undefined;
  Tables?: IOracleTableYaml[] | undefined;
  _templateOracleSet?: ITemplateOracleSetYaml | undefined;
  _childOf?: IOracleSet["$id"] | undefined;
  _parentOf?: IOracleSet["$id"][] | undefined;
}

