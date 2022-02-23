import ISource from "../../general/interfaces/ISource";
import OracleCategoryId from "../OracleCategoryId";
import OracleTableId from "../OracleTableId";
import IOracleData from "./IOracleData";
import IOracleContent from "./IOracleContent";
import ITableDisplay from "./IOracleDisplay";
import IOracleTableRow from "./IOracleTableRow";
import IRowData, { IRowRollData } from "./IRowData";
import IOracleUsageData from "./IOracleUsageData";
import ITemplateTable from "./ITemplateTable";


export default interface IOracleInfoData extends IOracleData {

  $id?: OracleTableId;
  Category: OracleCategoryId;
  "Member of"?: OracleTableId | undefined;
  Description?: string | undefined;
  Source: ISource;
  Usage?: IOracleUsageData | undefined;
  Content?: IOracleContent | undefined;
  Display?: ITableDisplay | undefined;
  Oracles?: IOracleInfoData[] | undefined;
  Table?: IRowData[] | IRowRollData[] | IOracleTableRow[] | undefined;
  _templateTable?: ITemplateTable[] | undefined;
  _childOf?: OracleCategoryId | undefined;
  _parentOf?: string[] | undefined;
}
