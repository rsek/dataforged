import ITableColumn from "./ITableColumn";
import IResultColumn from "./IResultColumn";


export default interface IDisplayTable {
  "Result columns": IResultColumn[];
  "Roll columns": ITableColumn[];
}
