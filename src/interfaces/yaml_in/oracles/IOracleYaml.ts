import type { IOracle } from "@dataforged/interfaces/json_out/oracles/IOracle.js";
import type { IOracleContent } from "@dataforged/interfaces/json_out/oracles/IOracleContent.js";
import type { ITableDisplay } from "@dataforged/interfaces/json_out/oracles/IOracleDisplay.js";
import type { IRow } from "@dataforged/interfaces/json_out/oracles/IRow.js";
import type IRequirementsYaml from "@dataforged/interfaces/yaml_in/common/IRequirementsYaml.js";
import type IOracleUsageYaml from "@dataforged/interfaces/yaml_in/oracles/IOracleUsageYaml.js";
import type { IRowRollYaml } from "@dataforged/interfaces/yaml_in/oracles/IRowYaml.js";
import type IRowYaml from "@dataforged/interfaces/yaml_in/oracles/IRowYaml.js";
import type ITemplateOracleYaml from "@dataforged/interfaces/yaml_in/templates/ITemplateOracleYaml.js";
import type ITemplateTable from "@dataforged/interfaces/yaml_in/templates/ITemplateTableYaml.js";
import type ITemplateYamlBase from "@dataforged/interfaces/yaml_in/templates/ITemplateYamlBase.js";
import type { OracleCategoryId } from "@dataforged/strings/id/OracleCategoryId.js";
import type { OracleTableId } from "@dataforged/strings/id/OracleTableId.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";

export default interface IOracleYaml extends  ITemplateYamlBase, Omit<Partial<IOracle>, "Oracles"|"Table"|"Usage"> {
  Name: string;
  Usage?: IOracleUsageYaml | undefined;
  Oracles?: IOracleYaml[] | undefined;
  Requires?: IRequirementsYaml | undefined;
  $id?: OracleTableId;
  Category: OracleCategoryId;
  "Member of"?: OracleTableId | undefined;
  Description?: ParagraphsString | undefined;
  Content?: IOracleContent | undefined;
  Display?: ITableDisplay | undefined;
  Table?: IRowYaml[] | IRowRollYaml[] | IRow[] | undefined;
  _templateInfo?: ITemplateOracleYaml | undefined;
  _templateTable?: ITemplateTable | undefined;
  _childOf?: OracleCategoryId | undefined;
  _parentOf?: string[] | undefined;
}
