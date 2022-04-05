
import type IOracle from "./IOracle.js";
import type IOracleCategoryDisplay from "./IOracleCategoryDisplay.js";
import type IOracleUsage from "./IOracleUsage.js";
import type IOracleCategoryYaml from "./yaml/IOracleCategoryYaml.js";
import type Source from "../../general/Source.js";
import type { ParagraphsString } from "../../general/StringTypes.js";
import type OracleCategoryId from "../OracleCategoryId.js";
import type { OracleCategoryJaggedId, OracleCategoryName } from "../OracleCategoryId.js";

export default interface IOracleCategoryInfo extends Omit<IOracleCategoryYaml, "Requires" | "Categories" | "Usage" | "Oracles" | "_templateCategory" | "_childOf" | "_parentOf"> {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[] | undefined;
  Source: Source;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: ParagraphsString | undefined;
  Display?: IOracleCategoryDisplay;
  Usage?: IOracleUsage | undefined;
  Oracles?: IOracle[] | undefined;
  Categories?: IOracleCategoryInfo[] | undefined;
  "Sample Names"?: string[];
}
