import IDisplay from "../../general/IDisplay";
import OracleTableId from "../OracleTableId";
import IDisplayTable from "./IDisplayTable";


export default interface ITableDisplay extends IDisplay {
  Title: string;
  "Column of"?: OracleTableId | undefined;
  Table: IDisplayTable;
}
