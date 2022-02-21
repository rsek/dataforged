
import t from 'ts-runtime/lib';
import ITableColumn from '../interfaces/ITableColumn';
import IResultColumn from "../interfaces/IResultColumn";
import OracleTableId from "../OracleTableId";
import OracleTableRow from "./OracleTableRow";


export class ResultColumn implements IResultColumn {
  Label: string = "Result";
  Content: OracleTableId;
  Key: keyof OracleTableRow = "Result";
  constructor(content: OracleTableId, label: string = "Result", key: keyof OracleTableRow = "Result") {
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
