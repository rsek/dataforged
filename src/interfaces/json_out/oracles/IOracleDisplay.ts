import type IDisplay from "@dataforged/interfaces/json_out/common/IDisplay.js";
import type IDisplayTable from "@dataforged/interfaces/json_out/oracles/IDisplayTable.js";
import type OracleTableId from "@dataforged/strings/id/OracleTableId.js";

export default interface ITableDisplay extends IDisplay {
  Title: string;
  "Column of"?: OracleTableId | undefined;
  Table: IDisplayTable;
}
