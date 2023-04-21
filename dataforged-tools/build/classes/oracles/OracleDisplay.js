import { TableDisplayInfo } from "../index.js";
/**
 * @internal
 */
export class DisplayOracle {
    constructor(json, parentName, parentId) {
        var _a, _b;
        this.Title = (_a = json.Title) !== null && _a !== void 0 ? _a : parentName;
        this.Images = json.Images;
        this.Icon = json.Icon;
        this["Column of"] = (_b = (json["Column of"])) !== null && _b !== void 0 ? _b : undefined;
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