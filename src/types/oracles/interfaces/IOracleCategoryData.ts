import ISource from "../../general/interfaces/ISource";
import IOracleCategoryDisplay from "./IOracleCategoryDisplay";
import OracleCategoryId, { OracleCategoryJaggedId, OracleCategoryName } from "../OracleCategoryId";
import IOracleInfoData from "./IOracleInfoData";
import IOracleUsage from "./IOracleUsage";
import { OracleSubcategoryName } from "../OracleSubcategoryId";
import IRequirementsData from "../../general/interfaces/IRequirementsData";
import IOracleUsageData from "./IOracleUsageData";
import ITemplateCategory from "./ITemplateCategory";
import ITemplateInfoBase from "./ITemplateInfoBase";

export default interface IOracleCategoryData extends ITemplateInfoBase {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[] | undefined;
  Source: ISource;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: string | undefined;
  Display?: IOracleCategoryDisplay | undefined;
  Usage?: IOracleUsageData | undefined;
  Oracles?: IOracleInfoData[] | undefined;
  Categories?: IOracleCategoryData[] | undefined;
  Requires?: IRequirementsData;
  _templateCategory?: ITemplateCategory | undefined;
  _childOf?: OracleCategoryName | undefined;
  _parentOf?: OracleSubcategoryName[] | undefined;
}

