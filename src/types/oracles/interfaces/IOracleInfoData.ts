import { ISource } from "../../general/Source";
import OracleCategoryId from "../OracleCategoryId";
import OracleTableId from "../OracleTableId";
import IOracleData from "./IOracleData";
import IOracleContent from "./IOracleContent";
import IOracleInfoDisplay from "./IOracleInfoDisplay";
import IOracleTableRow from "./IOracleTableRow";
import IOracleUsage from "./IOracleUsage";
import IRowData, { IRowRollData } from "./IRowData";


export default interface IOracleInfoData extends IOracleData {

  $id?: OracleTableId;
  Category: OracleCategoryId;
  "Member of"?: OracleTableId | undefined;
  Description?: string | undefined;
  Source: ISource;
  Usage?: IOracleUsage | undefined;
  Content?: IOracleContent | undefined;
  Display?: IOracleInfoDisplay | undefined;
  Oracles?: IOracleInfoData[] | undefined;
  Table?: IRowData[] | IRowRollData[] | IOracleTableRow[] | undefined;
  _template?: IRowData[] | undefined;
  _childOf?: OracleCategoryId | undefined;
  _parentOf?: string[] | undefined;
}
