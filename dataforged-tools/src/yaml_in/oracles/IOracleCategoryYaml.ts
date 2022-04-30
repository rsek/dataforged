import type { IOracleCategory, OracleCategoryId, OracleCategoryName, OracleSubcategoryName } from "@json_out/index.js";
import type { IOracleUsageYaml, IOracleYaml, IRequirementsYaml, ITemplateOracleCategoryYaml, ITemplateYamlBase } from "@yaml_in/index.js";


export interface IOracleCategoryYaml extends ITemplateYamlBase, Omit<Partial<IOracleCategory>, "Oracles"|"Categories"|"Usage"> {
  $id: IOracleCategory["$id"];
  Name: OracleCategoryName;
  Requires?: IRequirementsYaml | undefined;
  Usage?: IOracleUsageYaml | undefined;
  Oracles?: IOracleYaml[] | undefined;
  Categories?: IOracleCategoryYaml[] | undefined;
  _templateCategory?: ITemplateOracleCategoryYaml | undefined;
  _childOf?: OracleCategoryName | undefined;
  _parentOf?: OracleSubcategoryName[] | undefined;
}

