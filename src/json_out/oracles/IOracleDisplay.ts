import type { IDisplay , IDisplayTable , OracleTableId } from "@json_out/index.js";

export interface ITableDisplay extends IDisplay {
  Title: string;
  "Column of"?: OracleTableId | undefined;
  Table: IDisplayTable;
}
