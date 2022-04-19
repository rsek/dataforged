"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingTruthOption = void 0;
const index_js_1 = require("../index.js");
/**
 * @internal
 */
class SettingTruthOption extends index_js_1.Row {
    constructor(parentId, json) {
        super(parentId, json);
        this["Description"] = json["Description"];
        this["Quest Starter"] = json["Quest Starter"];
        if (this.Subtable) {
            // what is happening here?
            this.Subtable = this.Subtable.map(row => { var _a; return new index_js_1.Row(`${(_a = this.$id) !== null && _a !== void 0 ? _a : "--"}/Subtable`.replaceAll(" ", "_"), row); });
            this.Subtable.forEach(row => row.validateRollTemplate());
        }
    }
}
exports.SettingTruthOption = SettingTruthOption;
//# sourceMappingURL=SettingTruthOption.js.map