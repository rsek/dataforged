import { CustomStat } from "./CustomStat.js";
import { Replacement, RollMethod, RollType } from "../../json_out/index.js";
/**
 * @internal
 */
export class MoveTriggerOption {
    constructor(json, parent, index) {
        var _a, _b, _c;
        this.$id = `${parent.$id}/Options/${index + 1}`;
        this.Text = json.Text;
        this["Roll type"] = (_a = json["Roll type"]) !== null && _a !== void 0 ? _a : RollType.Action;
        this.Method = (_b = json.Method) !== null && _b !== void 0 ? _b : RollMethod.Any;
        this.Using = (_c = json.Using) !== null && _c !== void 0 ? _c : [];
        if (json["Custom stat"]) {
            this["Custom stat"] = new CustomStat(json["Custom stat"], `${this.$id}/Custom_stat`);
            if (this.Using && this["Custom stat"]) {
                this.Using = this.Using.map(item => { var _a; return (item) === Replacement.CustomStat ? (_a = this["Custom stat"]) === null || _a === void 0 ? void 0 : _a.$id : item; });
            }
        }
    }
}
/**
 * @internal
 */
export class MoveTriggerOptionAction extends MoveTriggerOption {
    constructor(json, parent, index) {
        super(json, parent, index);
    }
}
/**
 * @internal
 */
export class MoveTriggerOptionProgress extends MoveTriggerOption {
    constructor(json, parent, index) {
        super(json, parent, index);
    }
}
//# sourceMappingURL=MoveTriggerOption.js.map