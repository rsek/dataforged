import { DisplayTable } from "@classes/index.js";
import type { IDisplayTable, ImageUrl, IOracle, ITableDisplay, OracleTableId, Raster, Vector } from "@json_out/index.js";

/**
 * @internal
 */
export class OracleDisplay implements ITableDisplay {
  Title: string;
  "Column of"?: IOracle["$id"] | undefined;
  Table: DisplayTable;
  Images?: ImageUrl<Raster>[] | undefined;
  Icon?: ImageUrl<Vector> | undefined;
  constructor(json: Partial<ITableDisplay>, parentName: string, parentId: IOracle["$id"]) {
    this.Title = json.Title ?? parentName;
    this.Images = json.Images;
    this.Icon = json.Icon;
    this["Column of"] = (json["Column of"] as OracleTableId) ?? undefined;
    const tableData = json.Table as Partial<IDisplayTable>;
    if (tableData) {
      this.Table = new DisplayTable(tableData, parentId);
    } else {
      this.Table = new DisplayTable({}, parentId);
    }
  }
}