import { DisplayTable } from "../index.js";
export class OracleDisplay {
    constructor(json, parentName, parentId) {
        this.Title = json.Title ?? parentName;
        this.Images = json.Images;
        this.Icon = json.Icon;
        this["Column of"] = json["Column of"] ?? undefined;
        const tableData = json.Table;
        if (tableData) {
            this.Table = new DisplayTable(tableData, parentId);
        }
        else {
            this.Table = new DisplayTable({}, parentId);
        }
    }
}
//# sourceMappingURL=OracleDisplay.js.map