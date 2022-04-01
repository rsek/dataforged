import type IOracleContent from "./IOracleContent.js";
import type ITableDisplay from "./IOracleDisplay.js";
import type IOracleUsage from "./IOracleUsage.js";
import IRow from "./IRow.js";
import type IOracleYaml from "./yaml/IOracleYaml.js";
import IRequirements from "../../general/interfaces/IRequirements.js";
import type Source from "../../general/Source.js";
import type OracleTableId from "../OracleTableId.js";

export default interface IOracle extends Omit<IOracleYaml, "Usage" | "Oracles" | "Requires" | "_templateInfo" | "_templateTable" | "_childOf" | "_parentOf"> {
  $id: OracleTableId;
  Name: string;
  Source: Source;
  Usage?: IOracleUsage | undefined;
  Content?: IOracleContent | undefined;
  Display?: ITableDisplay | undefined;
  Oracles?: IOracle[] | undefined;
}

