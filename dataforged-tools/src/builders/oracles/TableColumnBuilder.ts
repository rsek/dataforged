import { TableColumnType } from "@schema";
import type { OracleTable, TableColumnRoll, TableColumnText } from "@schema";

/**
 * @internal
 */
export class TableColumnTextBuilder implements TableColumnText {
  readonly Type = TableColumnType.String;
  $id: string;
  Label: TableColumnText["Label"];
  ["Content"]: TableColumnText["Content"];
  Key: TableColumnText["Key"];
  constructor(parentID: string, content: OracleTable["$id"], index: number, label: string = "Result", key: TableColumnText["Key"] = "Result") {
    this.$id = `${parentID}/Columns/${index+1}`;
    this.Label = label;
    this["Content"] = content;
    this.Key = key;
  }
}

/**
 * @internal
 */
export class TableColumnRollBuilder implements TableColumnRoll {
  readonly Type = TableColumnType.Range;
  $id: string;
  Label: string;
  ["Content"]: TableColumnRoll["Content"];
  constructor(parentID: string, content: OracleTable["$id"], index: number, label: string = "Roll") {
    this.$id = `${parentID}/Columns/${index+1}`;
    this.Label = label;
    this["Content"] = content;
  }
}
