"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleDisplay = void 0;
const index_js_1 = require("../index.js");
/**
 * @internal
 */
class OracleDisplay {
    constructor(json, parentName, parentId) {
        var _a, _b;
        this.Title = (_a = json.Title) !== null && _a !== void 0 ? _a : parentName;
        this.Images = json.Images;
        this.Icon = json.Icon;
        this["Column of"] = (_b = json["Column of"]) !== null && _b !== void 0 ? _b : undefined;
        const tableData = json.Table;
        if (tableData) {
            this.Table = new index_js_1.DisplayTable(tableData, parentId);
        }
        else {
            this.Table = new index_js_1.DisplayTable({}, parentId);
        }
    }
}
exports.OracleDisplay = OracleDisplay;
//# sourceMappingURL=OracleDisplay.js.map