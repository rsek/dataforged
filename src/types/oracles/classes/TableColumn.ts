
import t from 'ts-runtime/lib';
import ITableColumn from '../interfaces/ITableColumn';
import IResultColumn from "../interfaces/IResultColumn";
import OracleTableId from "../OracleTableId";
import Row from "./Row";


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
