
import t from 'ts-runtime/lib';
import _ from "lodash";
import OracleTableId from "../OracleTableId";
import DisplayTable from "./DisplayTable";
import IDisplayTable from "../interfaces/IDisplayTable";
import IOracleInfoDisplay from '../interfaces/IOracleInfoDisplay';

export default class OracleInfoDisplay implements IOracleInfoDisplay {
  Title: string;
  "Column of"?: OracleTableId | undefined;
  Table: DisplayTable;
  constructor(json: Partial<IOracleInfoDisplay>, parentName: string, parentId: OracleTableId) {
    this.Title = json.Title ?? parentName;
    this["Column of"] = json["Column of"] ?? undefined;
    let tableData = json.Table as Partial<IDisplayTable>;
    if (tableData) {
      this.Table = new DisplayTable(tableData, parentId);
    } else {
      this.Table = new DisplayTable({}, parentId);
    }
  }
}