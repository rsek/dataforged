import IRequirementsYaml from "../../../general/interfaces/IRequirementsYaml";
import ISource from "../../../general/interfaces/ISource";
import OracleCategoryId, { OracleCategoryName, OracleCategoryJaggedId } from "../../OracleCategoryId";
import { OracleSubcategoryName } from "../../OracleSubcategoryId";
import IOracleCategoryDisplay from "../IOracleCategoryDisplay";
import ITemplateOracleCategoryYaml from "./ITemplateOracleCategoryYaml";
import ITemplateYamlBase from "./ITemplateYamlBase";
import IOracleUsageYaml from "./IOracleUsageYaml";
import IOracleYaml from "./IOracleYaml";


export default interface IOracleCategoryYaml extends ITemplateYamlBase {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[] | undefined;
  Source: ISource;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: string | undefined;
  Display?: IOracleCategoryDisplay | undefined;
  Usage?: IOracleUsageYaml | undefined;
  Oracles?: IOracleYaml[] | undefined;
  Categories?: IOracleCategoryYaml[] | undefined;
  Requires?: IRequirementsYaml;
  _templateCategory?: ITemplateOracleCategoryYaml | undefined;
  _childOf?: OracleCategoryName | undefined;
  _parentOf?: OracleSubcategoryName[] | undefined;
}

