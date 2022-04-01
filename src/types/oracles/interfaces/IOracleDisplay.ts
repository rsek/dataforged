import type IDisplayTable from "./IDisplayTable.js";
import type IDisplay from "../../general/IDisplay.js";
import type OracleTableId from "../OracleTableId.js";

export default interface ITableDisplay extends IDisplay {
  Title: string;
  "Column of"?: OracleTableId | undefined;
  Table: IDisplayTable;
}
