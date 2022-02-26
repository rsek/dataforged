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
import ITemplateInfoBase from "./ITemplateInfoBase";
import ITemplateInfo from "./ITemplateInfo";
import IRequirementsData from "../../general/interfaces/IRequirementsData";

export default interface IOracleInfoData extends IOracleData, ITemplateInfoBase {

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
  Requires?: IRequirementsData | undefined;
  _templateInfo?: ITemplateInfo | undefined;
  _templateTable?: ITemplateTable | undefined;
  _childOf?: OracleCategoryId | undefined;
  _parentOf?: string[] | undefined;
}
