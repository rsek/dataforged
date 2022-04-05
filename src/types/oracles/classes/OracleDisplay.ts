import DisplayTable from "./DisplayTable.js";
import type { ImageUrl, Raster, Vector } from "../../general/Url.js";
import type IDisplayTable from "../interfaces/IDisplayTable.js";
import type ITableDisplay from "../interfaces/IOracleDisplay.js";
import type OracleTableId from "../OracleTableId.js";

export default class OracleDisplay implements ITableDisplay {
  Title: string;
  "Column of"?: OracleTableId | undefined;
  Table: DisplayTable;
  Images?: ImageUrl<Raster>[] | undefined;
  Icon?: ImageUrl<Vector> | undefined;
  constructor(json: Partial<ITableDisplay>, parentName: string, parentId: OracleTableId) {
    this.Title = json.Title ?? parentName;
    this.Images = json.Images;
    this.Icon = json.Icon;
    this["Column of"] = json["Column of"] ?? undefined;
    const tableData = json.Table as Partial<IDisplayTable>;
    if (tableData) {
      this.Table = new DisplayTable(tableData, parentId);
    } else {
      this.Table = new DisplayTable({}, parentId);
    }
  }
}