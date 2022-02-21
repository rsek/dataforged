import OracleCategoryId, { OracleCategoryJaggedId, OracleCategoryName } from "../OracleCategoryId";

import IOracleInfo from "./IOracleInfo";
import IOracleUsage from "./IOracleUsage";
import { Source } from "../../general/Source";
import IOracleCategoryDisplay from "./IOracleCategoryDisplay";
import IOracleCategoryData from "./IOracleCategoryData";

export default interface IOracleCategory extends IOracleCategoryData {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[] | undefined;
  Source: Source;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: string | undefined;
  Display?: IOracleCategoryDisplay;
  Usage?: IOracleUsage | undefined;
  Oracles?: IOracleInfo[] | undefined;
  Categories?: IOracleCategory[] | undefined;
}
