import { ISource } from "../../general/Source";
import IOracleCategoryDisplay from "./IOracleCategoryDisplay";
import OracleCategoryId, { OracleCategoryJaggedId, OracleCategoryName } from "../OracleCategoryId";
import IOracleInfoData from "./IOracleInfoData";
import IOracleUsage from "./IOracleUsage";
import { OracleSubcategoryName } from "../OracleSubcategoryId";



export default interface IOracleCategoryData {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[] | undefined;
  Source: ISource;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: string | undefined;
  Display?: IOracleCategoryDisplay | undefined;
  Usage?: IOracleUsage | undefined;
  Oracles?: IOracleInfoData[] | undefined;
  Categories?: IOracleCategoryData[] | undefined;
  _childOf?: OracleCategoryName | undefined;
  _parentOf?: OracleSubcategoryName[] | undefined;
}

