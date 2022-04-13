import { MoveTrigger } from "../index.js";
import { replaceInAllStrings } from "../../utils/object_transform/replaceInAllStrings.js";
import _ from "lodash-es";
/**
 * @internal
 */
export class AlterMove {
    constructor(json, parent, grandparent, gamespace) {
        var _a, _b;
        let moveIdFragment = "Moves/*";
        if (json.Move) {
            moveIdFragment = json.Move.replace(gamespace + "/", "");
        }
        this.$id = `${parent.$id}/Alter_${moveIdFragment}`;
        this.Move = (_a = json.Move) !== null && _a !== void 0 ? _a : null;
        if (json.Trigger) {
            const triggerClone = _.cloneDeep(json.Trigger);
            if ((_b = grandparent["Condition Meter"]) === null || _b === void 0 ? void 0 : _b.$id) {
                triggerClone.Options = replaceInAllStrings(triggerClone.Options, "${{Asset_Condition_Meter}}", grandparent["Condition Meter"].$id);
            }
            this.Trigger = new MoveTrigger(triggerClone, `${this.$id}/Trigger`);
        }
    }
}
//# sourceMappingURL=AlterMove.js.map