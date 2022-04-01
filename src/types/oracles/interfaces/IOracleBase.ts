import type IOracleYamlBase from "./yaml/IOracleYamlBase.js";
import type Display from "../../general/IDisplay.js";
import type Source from "../../general/Source.js";
import type OracleContent from "../classes/OracleContent.js";
import type OracleUsage from "../classes/OracleUsage.js";
import type OracleCategoryId from "../OracleCategoryId.js";
import type OracleTableId from "../OracleTableId.js";

// interface for properties shared by IOracle and IOracleCategory

export default interface IOracleBase extends Omit<IOracleYamlBase, "Usage"> {
  $id: OracleTableId | OracleCategoryId;
  Source: Source;
  Category?: OracleCategoryId | undefined;
  "Member of"?: OracleTableId | undefined;
  Display?: Display | undefined;
  Usage?: OracleUsage | undefined;
  Content?: OracleContent | undefined;
}
