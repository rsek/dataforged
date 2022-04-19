"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveTriggerOption = void 0;
const CustomStat_js_1 = require("./CustomStat.js");
const Replacement_js_1 = require("../../json_out/common/Replacement.js");
const index_js_1 = require("../../json_out/index.js");
/**
 * @internal
 */
class MoveTriggerOption {
    constructor(json, parent, index) {
        var _a, _b;
        this.$id = `${parent.$id}/Options/${index + 1}`;
        this.Text = json.Text;
        this["Roll type"] = json["Roll type"];
        this.Method = (_a = json.Method) !== null && _a !== void 0 ? _a : index_js_1.RollMethod.Any;
        // if (json.Using && json.Using.includes(Replacement.AssetMeter)) {
        //   throw badJsonError(this.constructor, json, "`Using` includes an unexpected template string. It should be replaced before being sent to this constructor.");
        // } else {
        this.Using = (_b = json.Using) !== null && _b !== void 0 ? _b : [];
        // }
        if (json["Custom stat"]) {
            this["Custom stat"] = new CustomStat_js_1.CustomStat(json["Custom stat"], `${this.$id}/Custom_stat`);
            if (this.Using && this["Custom stat"]) {
                this.Using = this.Using.map(item => { var _a; return item === Replacement_js_1.Replacement.CustomStat ? (_a = this["Custom stat"]) === null || _a === void 0 ? void 0 : _a.$id : item; });
            }
        }
    }
}
exports.MoveTriggerOption = MoveTriggerOption;
//# sourceMappingURL=MoveTriggerOption.js.map