import type { IOracleCategory, ISource } from "@json_out/index.js";
import type { IOracleUsageYaml, IOracleYaml, IRequirementsYaml, ITemplateOracleCategoryYaml, ITemplateYamlBase, YamlStubTitle } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IOracleCategoryYaml extends ITemplateYamlBase, YamlStubTitle<IOracleCategory, "","Requires"|"Usage"|"Oracles"|"Categories"> {
  Requires?: IRequirementsYaml | undefined;
  Usage?: IOracleUsageYaml | undefined;
  Oracles?: IOracleYaml[] | undefined;
  Source: ISource;
  Categories?: IOracleCategoryYaml[] | undefined;
  _templateCategory?: ITemplateOracleCategoryYaml | undefined;
  _childOf?: IOracleCategory["$id"] | undefined;
  _parentOf?: IOracleCategory["$id"][] | undefined;
}

