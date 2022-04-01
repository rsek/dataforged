

import type Row from "./Row.js";
import type IResultColumn from "../interfaces/IResultColumn.js";
import type ITableColumn from "../interfaces/ITableColumn.js";
import type OracleTableId from "../OracleTableId.js";

export class ResultColumn implements IResultColumn {
  Label: IResultColumn["Label"];
  Content: IResultColumn["Content"];
  Key: IResultColumn["Key"];
  constructor(content: OracleTableId, label: string = "Result", key: keyof Row = "Result") {
    this.Label = label;
    this.Content = content;
    this.Key = key;
  }
}

export class RollColumn implements ITableColumn {
  Label: string = "Roll";
  Content: OracleTableId;
  constructor(content: OracleTableId, label: string = "Roll") {
    this.Label = label;
    this.Content = content;
  }
}
