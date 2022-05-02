import type { IOracleCategory } from "@json_out/index.js";
import type { IOracleUsageYaml, IOracleYaml, IRequirementsYaml, ITemplateOracleCategoryYaml, ITemplateYamlBase } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IOracleCategoryYaml extends ITemplateYamlBase, Omit<Partial<IOracleCategory>, "Oracles"|"Categories"|"Usage"> {
  $id: IOracleCategory["$id"];
  Name: string;
  Requires?: IRequirementsYaml | undefined;
  Usage?: IOracleUsageYaml | undefined;
  Oracles?: IOracleYaml[] | undefined;
  Categories?: IOracleCategoryYaml[] | undefined;
  _templateCategory?: ITemplateOracleCategoryYaml | undefined;
  _childOf?: IOracleCategory["$id"] | undefined;
  _parentOf?: IOracleCategory["$id"][] | undefined;
}

