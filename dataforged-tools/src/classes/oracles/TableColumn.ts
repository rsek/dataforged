import { TableColumnType } from "@json_out/index.js";
import type { IOracle, ITableColumnRoll , ITableColumnText } from "@json_out/index.js";

/**
 * @internal
 */
export class TableColumnText implements ITableColumnText {
  readonly Type = TableColumnType.String;
  $id: string;
  Label: ITableColumnText["Label"];
  ["Use content from"]: ITableColumnText["Use content from"];
  Key: ITableColumnText["Key"];
  constructor(parentID: string, content: IOracle["$id"], index: number, label: string = "Result", key: ITableColumnText["Key"] = "Result") {
    this.$id = `${parentID}/Columns/${index+1}`;
    this.Label = label;
    this["Use content from"] = content;
    this.Key = key;
  }
}

/**
 * @internal
 */
export class TableColumnRoll implements ITableColumnRoll {
  readonly Type = TableColumnType.Range;
  $id: string;
  Label: string;
  ["Use content from"]: ITableColumnRoll["Use content from"];
  constructor(parentID: string, content: IOracle["$id"], index: number, label: string = "Roll") {
    this.$id = `${parentID}/Columns/${index+1}`;
    this.Label = label;
    this["Use content from"] = content;
  }
}
