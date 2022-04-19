"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleUsage = void 0;
const index_js_1 = require("../index.js");
/**
 * @internal
 */
class OracleUsage {
    constructor(json) {
        var _a;
        // if (!is<IOracleUsageData>(json)) {
        //   throw new Error();
        // }
        this.Initial = json.Initial;
        this["Max rolls"] = json["Max rolls"];
        this.Repeatable = json.Repeatable;
        this["Allow duplicates"] = (_a = json["Allow duplicates"]) !== null && _a !== void 0 ? _a : false;
        if (json.Suggestions) {
            this.Suggestions = new index_js_1.Suggestions(json.Suggestions);
        }
        if (json.Requires) {
            this.Requires = new index_js_1.Requirements(json.Requires);
        }
        // this["Sets attributes"] = json["Sets attributes"];
    }
}
exports.OracleUsage = OracleUsage;
//# sourceMappingURL=OracleUsage.js.map