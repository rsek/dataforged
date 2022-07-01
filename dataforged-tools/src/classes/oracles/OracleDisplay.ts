//License: MIT
import { TableDisplayInfo } from "@classes/index.js";
import type { IDisplayOracle as IDisplayOracle, IOracle, ITableDisplayInfo } from "@json_out/index.js";

/**
 * @internal
 */
export class DisplayOracle implements IDisplayOracle {
  Title: string;
  "Column of"?: IOracle["$id"] | undefined;
  Table: TableDisplayInfo;
  Images?: IDisplayOracle["Images"];
  Icon?: IDisplayOracle["Icon"];
  constructor(json: Partial<IDisplayOracle>, parentName: string, parentId: IOracle["$id"]) {
    this.Title = json.Title ?? parentName;
    this.Images = json.Images;
    this.Icon = json.Icon;
    this["Column of"] = (json["Column of"]) ?? undefined;
    const tableData = json.Table as Partial<ITableDisplayInfo>;
    if (tableData) {
      this.Table = new TableDisplayInfo(tableData, parentId);
    } else {
      this.Table = new TableDisplayInfo({}, parentId);
    }
  }
}