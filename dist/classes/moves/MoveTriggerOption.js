import { CustomStat } from "./CustomStat.js";
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
        this.Using = (_b = json.Using) !== null && _b !== void 0 ? _b : [];
        if (json["Custom stat"]) {
            this["Custom stat"] = new CustomStat(json["Custom stat"], `${this.$id}/Custom_stat`);
            this.Using.forEach(item => {
                if (item === "${{Custom stat}}" && this["Custom stat"]) {
                    item = this["Custom stat"].$id;
                }
            });
        }
    }
}
//# sourceMappingURL=MoveTriggerOption.js.map