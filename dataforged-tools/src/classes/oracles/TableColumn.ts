import type { IOracle, ITextColumn } from "@json_out/index.js";
import type { IRollColumn } from "@json_out/oracles/IRollColumn.js";

/**
 * @internal
 */
export class TextColumn implements ITextColumn {
  Label: ITextColumn["Label"];
  ["Use content from"]: ITextColumn["Use content from"];
  Key: ITextColumn["Key"];
  constructor(content: IOracle["$id"], label: string = "Result", key: ITextColumn["Key"] = "Result") {
    this.Label = label;
    this["Use content from"] = content;
    this.Key = key;
  }
}

/**
 * @internal
 */
export class RollColumn implements IRollColumn {
  Label: string = "Roll";
  ["Use content from"]: IOracle["$id"];
  constructor(content: IOracle["$id"], label: string = "Roll") {
    this.Label = label;
    this["Use content from"] = content;
  }
}
