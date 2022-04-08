import type { OracleSubcategoryName } from "@dataforged/interfaces/json_out/index.js";
import type { IOracleCategory } from "@dataforged/interfaces/json_out/oracles/IOracleCategory.js";
import type { OracleCategoryName } from "@dataforged/interfaces/json_out/oracles/strings/OracleCategoryId.js";
import type { OracleCategoryId } from "@dataforged/interfaces/json_out/oracles/strings/OracleCategoryId.js";
import type IRequirementsYaml from "@dataforged/interfaces/yaml_in/common/IRequirementsYaml.js";
import type IOracleUsageYaml from "@dataforged/interfaces/yaml_in/oracles/IOracleUsageYaml.js";
import type IOracleYaml from "@dataforged/interfaces/yaml_in/oracles/IOracleYaml.js";
import type ITemplateOracleCategoryYaml from "@dataforged/interfaces/yaml_in/templates/ITemplateOracleCategoryYaml.js";
import type ITemplateYamlBase from "@dataforged/interfaces/yaml_in/templates/ITemplateYamlBase.js";

export default interface IOracleCategoryYaml extends ITemplateYamlBase, Omit<Partial<IOracleCategory>, "Oracles"|"Categories"|"Usage"> {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Requires?: IRequirementsYaml | undefined;
  Usage?: IOracleUsageYaml | undefined;
  Oracles?: IOracleYaml[] | undefined;
  Categories?: IOracleCategoryYaml[] | undefined;
  _templateCategory?: ITemplateOracleCategoryYaml | undefined;
  _childOf?: OracleCategoryName | undefined;
  _parentOf?: OracleSubcategoryName[] | undefined;
}

