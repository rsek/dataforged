import { TableDisplayInfo } from "../index.js";
/**
 * @internal
 */
export class DisplayOracle {
    Title;
    "Column of";
    Table;
    Images;
    Icon;
    constructor(json, parentName, parentId) {
        this.Title = json.Title ?? parentName;
        this.Images = json.Images;
        this.Icon = json.Icon;
        this["Column of"] = (json["Column of"]) ?? undefined;
        const tableData = json.Table;
        if (tableData) {
            this.Table = new TableDisplayInfo(tableData, parentId);
        }
        else {
            this.Table = new TableDisplayInfo({}, parentId);
        }
    }
}
//# sourceMappingURL=OracleDisplay.js.map