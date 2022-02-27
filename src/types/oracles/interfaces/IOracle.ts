import Source from "../../general/Source";
import IOracleContent from "./IOracleContent";
import OracleTableId from "../OracleTableId";
import IRow from "./IRow";
import IOracleUsage from "./IOracleUsage";
import ITableDisplay from "./IOracleDisplay";
import IOracleYaml from './yaml/IOracleYaml';
import IRequirements from "../../general/interfaces/IRequirements";

export default interface IOracle extends Omit<IOracleYaml, "Usage" | "Oracles" | "Requires" | "_templateInfo" | "_templateTable" | "_childOf" | "_parentOf"> {
  $id: OracleTableId;
  Name: string;
  Source: Source;
  Usage?: IOracleUsage | undefined;
  Content?: IOracleContent | undefined;
  Display?: ITableDisplay | undefined;
  Oracles?: IOracle[] | undefined;
}

