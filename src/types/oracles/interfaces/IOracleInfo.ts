import Source from "../../general/Source";
import IOracleContent from "./IOracleContent";
import OracleTableId from "../OracleTableId";
import IOracleTableRow from "./IOracleTableRow";
import IOracleUsage from "./IOracleUsage";
import ITableDisplay from "./IOracleDisplay";
import IOracleInfoData from './IOracleInfoData';
import IRequirements from "../../general/interfaces/IRequirements";

export default interface IOracleInfo extends Omit<IOracleInfoData, "Usage" | "Oracles" | "Requires"> {
  $id: OracleTableId;
  Source: Source;
  Usage?: IOracleUsage | undefined;
  Content?: IOracleContent | undefined;
  Display?: ITableDisplay | undefined;
  Oracles?: IOracleInfo[] | undefined;
  Requires?: IRequirements | undefined;
}
