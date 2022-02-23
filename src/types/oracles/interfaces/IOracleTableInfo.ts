import IOracleInfo from "./IOracleInfo";
import IOracleTableRow from "./IOracleTableRow";
import ITemplateTable from "./ITemplateTable";

export default interface IOracleTableInfo extends IOracleInfo {
  Table?: IOracleTableRow[] | undefined;
  _templateTable?: ITemplateTable | undefined;
}

