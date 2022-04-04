import type IOracleUsageYaml from "./IOracleUsageYaml.js";
import type IOracleYaml from "./IOracleYaml.js";
import type ITemplateOracleCategoryYaml from "./ITemplateOracleCategoryYaml.js";
import type ITemplateYamlBase from "./ITemplateYamlBase.js";
import type IRequirementsYaml from "../../../general/interfaces/IRequirementsYaml.js";
import type ISource from "../../../general/interfaces/ISource.js";
import type MdString from "../../../general/MdString.js";
import type { OracleCategoryJaggedId, OracleCategoryName } from "../../OracleCategoryId.js";
import type OracleCategoryId from "../../OracleCategoryId.js";
import type { OracleSubcategoryName } from "../../OracleSubcategoryId.js";
import type IOracleCategoryDisplay from "../IOracleCategoryDisplay.js";

export default interface IOracleCategoryYaml extends ITemplateYamlBase {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[] | undefined;
  Source: ISource;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: MdString | undefined;
  Display?: IOracleCategoryDisplay | undefined;
  Usage?: IOracleUsageYaml | undefined;
  Oracles?: IOracleYaml[] | undefined;
  Categories?: IOracleCategoryYaml[] | undefined;
  Requires?: IRequirementsYaml;
  "Sample Names"?: string[];
  _templateCategory?: ITemplateOracleCategoryYaml | undefined;
  _childOf?: OracleCategoryName | undefined;
  _parentOf?: OracleSubcategoryName[] | undefined;
}

