import { DisplayTable } from "@dataforged/classes/oracles/DisplayTable.js";
import type { IDisplayTable, ImageUrl, ITableDisplay, OracleTableId, Raster, Vector } from "@dataforged/json_out/index.js";

export class OracleDisplay implements ITableDisplay {
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