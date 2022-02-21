import IDisplay from "../../general/Display";
import OracleTableId from "../OracleTableId";
import IDisplayTable from "./IDisplayTable";


export default interface IOracleInfoDisplay extends IDisplay {
  Title: string;
  "Column of"?: OracleTableId | undefined;
  Table: IDisplayTable;
}
