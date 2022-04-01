import type IResultColumn from "./IResultColumn.js";
import type ITableColumn from "./ITableColumn.js";

export default interface IDisplayTable {
  "Result columns": IResultColumn[];
  "Roll columns": ITableColumn[];
}
