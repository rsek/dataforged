import type { IResultColumn } from "@dataforged/interfaces/json_out/oracles/IResultColumn.js";
import type { ITableColumnBase } from "@dataforged/interfaces/json_out/oracles/ITableColumnBase.js";

export interface IDisplayTable {
  "Result columns": IResultColumn[];
  "Roll columns": ITableColumnBase[];
}
