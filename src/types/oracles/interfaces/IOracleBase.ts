import Display from "../../general/Display";
import Source from "../../general/Source";
import OracleContent from "../classes/OracleContent";
import OracleUsage from "../classes/OracleUsage";
import OracleCategoryId from "../OracleCategoryId";
import OracleTableId from "../OracleTableId";
import IOracleYamlBase from "./yaml/IOracleYamlBase";

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
