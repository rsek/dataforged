import type { IOracle, IResultColumn, IRow, ITableColumnBase } from "@json_out/index.js";

/**
 * @internal
 */
export class ResultColumn implements IResultColumn {
  Label: IResultColumn["Label"];
  ["Use content from"]: IResultColumn["Use content from"];
  Key: IResultColumn["Key"];
  constructor(content: IOracle["$id"], label: string = "Result", key: keyof IRow = "Result") {
    this.Label = label;
    this["Use content from"] = content;
    this.Key = key;
  }
}

/**
 * @internal
 */
export class RollColumn implements ITableColumnBase {
  Label: string = "Roll";
  ["Use content from"]: IOracle["$id"];
  constructor(content: IOracle["$id"], label: string = "Roll") {
    this.Label = label;
    this["Use content from"] = content;
  }
}
