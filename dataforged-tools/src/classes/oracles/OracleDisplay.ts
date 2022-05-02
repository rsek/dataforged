import { DisplayTable } from "@classes/index.js";
import type { IDisplayTable, IOracle, ITableDisplay } from "@json_out/index.js";

/**
 * @internal
 */
export class TableDisplay implements ITableDisplay {
  Title: string;
  "Column of"?: IOracle["$id"] | undefined;
  Table: DisplayTable;
  Images?: ITableDisplay["Images"];
  Icon?: ITableDisplay["Icon"];
  constructor(json: Partial<ITableDisplay>, parentName: string, parentId: IOracle["$id"]) {
    this.Title = json.Title ?? parentName;
    this.Images = json.Images;
    this.Icon = json.Icon;
    this["Column of"] = (json["Column of"]) ?? undefined;
    const tableData = json.Table as Partial<IDisplayTable>;
    if (tableData) {
      this.Table = new DisplayTable(tableData, parentId);
    } else {
      this.Table = new DisplayTable({}, parentId);
    }
  }
}