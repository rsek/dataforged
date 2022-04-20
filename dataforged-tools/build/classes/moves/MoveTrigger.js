import { MoveTriggerOption } from "../index.js";
/**
 * @internal
 */
export class MoveTrigger {
    constructor(json, id) {
        var _a;
        this.$id = id;
        this.Text = json.Text;
        this["Options"] = (_a = json.Options) === null || _a === void 0 ? void 0 : _a.map((option, index) => new MoveTriggerOption(option, this, index));
    }
}
//# sourceMappingURL=MoveTrigger.js.map