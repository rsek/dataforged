import { TableDisplayInfo } from "../index.js";
/**
 * @internal
 */
export class DisplayOracle {
    constructor(json, parentId) {
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