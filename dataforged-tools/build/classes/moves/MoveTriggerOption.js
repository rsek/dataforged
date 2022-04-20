import { CustomStat } from "./CustomStat.js";
import { Replacement } from "../../json_out/common/Replacement.js";
import { RollMethod } from "../../json_out/index.js";
/**
 * @internal
 */
export class MoveTriggerOption {
    constructor(json, parent, index) {
        var _a, _b;
        this.$id = `${parent.$id}/Options/${index + 1}`;
        this.Text = json.Text;
        this["Roll type"] = json["Roll type"];
        this.Method = (_a = json.Method) !== null && _a !== void 0 ? _a : RollMethod.Any;
        // if (json.Using && json.Using.includes(Replacement.AssetMeter)) {
        //   throw badJsonError(this.constructor, json, "`Using` includes an unexpected template string. It should be replaced before being sent to this constructor.");
        // } else {
        this.Using = (_b = json.Using) !== null && _b !== void 0 ? _b : [];
        // }
        if (json["Custom stat"]) {
            this["Custom stat"] = new CustomStat(json["Custom stat"], `${this.$id}/Custom_stat`);
            if (this.Using && this["Custom stat"]) {
                this.Using = this.Using.map(item => { var _a; return item === Replacement.CustomStat ? (_a = this["Custom stat"]) === null || _a === void 0 ? void 0 : _a.$id : item; });
            }
        }
    }
}
//# sourceMappingURL=MoveTriggerOption.js.map