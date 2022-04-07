import type IResultColumn from "@dataforged/interfaces/json_out/oracles/IResultColumn.js";
import type ITableColumn from "@dataforged/interfaces/json_out/oracles/ITableColumn.js";

export default interface IDisplayTable {
  "Result columns": IResultColumn[];
  "Roll columns": ITableColumn[];
}
