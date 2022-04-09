import type { IRow, ITableColumnBase , OracleTableId } from "@dataforged/json_out/index.js";

export interface IResultColumn extends ITableColumnBase {
  Label: string;
  "Use content from": OracleTableId;
  Key: keyof IRow;
}
