"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleCategoryDisplay = void 0;
/**
 * @internal
 */
class OracleCategoryDisplay {
    constructor(json, parentName) {
        var _a;
        this.Title = (_a = json.Title) !== null && _a !== void 0 ? _a : parentName;
        this.Images = json.Images;
    }
}
exports.OracleCategoryDisplay = OracleCategoryDisplay;
//# sourceMappingURL=OracleCategoryDisplay.js.map