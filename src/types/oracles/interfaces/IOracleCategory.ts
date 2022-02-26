import OracleCategoryId, { OracleCategoryJaggedId, OracleCategoryName } from "../OracleCategoryId";

import IOracle from "./IOracle";
import IOracleUsage from "./IOracleUsage";
import Source from "../../general/Source";
import IOracleCategoryDisplay from "./IOracleCategoryDisplay";
import IOracleCategoryYaml from "./yaml/IOracleCategoryYaml";

export default interface IOracleCategoryInfo extends Omit<IOracleCategoryYaml, "Requires" | "Categories" | "Usage" | "Oracles" | "_templateCategory" | "_childOf" | "_parentOf"> {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[] | undefined;
  Source: Source;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: string | undefined;
  Display?: IOracleCategoryDisplay;
  Usage?: IOracleUsage | undefined;
  Oracles?: IOracle[] | undefined;
  Categories?: IOracleCategoryInfo[] | undefined;
}
