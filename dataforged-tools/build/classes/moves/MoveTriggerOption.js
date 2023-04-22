import { CustomStat } from "./CustomStat.js";
import { Replacement, RollMethod, RollType } from "../../json_out/index.js";
/**
 * @internal
 */
export class MoveTriggerOption {
    $id;
    Text;
    "Roll type";
    Method;
    Using;
    "Custom stat";
    constructor(json, parent, index) {
        this.$id = `${parent.$id}/Options/${index + 1}`;
        this.Text = json.Text;
        this["Roll type"] = json["Roll type"] ?? RollType.Action;
        this.Method = json.Method ?? RollMethod.Any;
        this.Using = json.Using ?? [];
        if (json["Custom stat"]) {
            this["Custom stat"] = new CustomStat(json["Custom stat"], this.$id);
            if (this.Using && this["Custom stat"]) {
                this.Using = this.Using.map(item => (item) === Replacement.CustomStat ? this["Custom stat"]?.$id : item);
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