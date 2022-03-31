import _ from "lodash-es";
import OracleTableId from "../OracleTableId";
import DisplayTable from "./DisplayTable";
import IDisplayTable from "../interfaces/IDisplayTable";
import ITableDisplay from "../interfaces/IOracleDisplay";
import UrlString from "../../general/UrlString";

export default class OracleDisplay implements ITableDisplay {
  Title: string;
  "Column of"?: OracleTableId | undefined;
  Table: DisplayTable;
  Images?: UrlString[] | undefined;
  constructor(json: Partial<ITableDisplay>, parentName: string, parentId: OracleTableId) {
    this.Title = json.Title ?? parentName;
    this.Images = json.Images;
    this["Column of"] = json["Column of"] ?? undefined;
    const tableData = json.Table as Partial<IDisplayTable>;
    if (tableData) {
      this.Table = new DisplayTable(tableData, parentId);
    } else {
      this.Table = new DisplayTable({}, parentId);
    }
  }
}