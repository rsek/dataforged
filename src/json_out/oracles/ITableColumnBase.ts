import type { OracleTableId } from "@json_out/index.js";

export interface ITableColumnBase {
  Label: string;
  "Use content from": OracleTableId;
}

