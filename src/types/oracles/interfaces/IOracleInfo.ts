import { Source } from "../../general/Source";
import IOracleContent from "./IOracleContent";
import OracleTableId from "../OracleTableId";
import IOracleTableRow from "./IOracleTableRow";
import IOracleUsage from "./IOracleUsage";
import IOracleInfoDisplay from "./IOracleInfoDisplay";
import IOracleInfoData from './IOracleInfoData';



export default interface IOracleInfo extends IOracleInfoData {
  $id: OracleTableId;
  Source: Source;
  Usage?: IOracleUsage | undefined;
  Content?: IOracleContent | undefined;
  Display?: IOracleInfoDisplay | undefined;
  Oracles?: IOracleInfo[] | undefined;
  Table?: IOracleTableRow[] | undefined;
}
