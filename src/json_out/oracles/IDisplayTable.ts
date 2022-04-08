import type { IResultColumn , ITableColumnBase } from "@dataforged/json_out/index.js";

export interface IDisplayTable {
  "Result columns": IResultColumn[];
  "Roll columns": ITableColumnBase[];
}
