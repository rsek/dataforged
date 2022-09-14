import { TableColumnType } from "@json_out/index.js";
import type { IOracleTable, ITableColumnRoll , ITableColumnText } from "@json_out/index.js";

/**
 * @internal
 */
export class TableColumnText implements ITableColumnText {
  readonly Type = TableColumnType.String;
  $id: string;
  Label: ITableColumnText["Label"];
  ["Content"]: ITableColumnText["Content"];
  Key: ITableColumnText["Key"];
  constructor(parentID: string, content: IOracleTable["$id"], index: number, label: string = "Result", key: ITableColumnText["Key"] = "Result") {
    this.$id = `${parentID}/Columns/${index+1}`;
    this.Label = label;
    this["Content"] = content;
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
  ["Content"]: ITableColumnRoll["Content"];
  constructor(parentID: string, content: IOracleTable["$id"], index: number, label: string = "Roll") {
    this.$id = `${parentID}/Columns/${index+1}`;
    this.Label = label;
    this["Content"] = content;
  }
}
