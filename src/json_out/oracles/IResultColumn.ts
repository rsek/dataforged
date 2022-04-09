import type { IRow, ITableColumnBase , OracleTableId } from "@json_out/index.js";

export interface IResultColumn extends ITableColumnBase {
  Label: string;
  "Use content from": OracleTableId;
  Key: keyof IRow;
}
