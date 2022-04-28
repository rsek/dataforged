import { MoveTriggerOption } from "../index.js";
/**
 * @internal
 */
export class MoveTrigger {
    constructor(json, id) {
        var _a, _b;
        this.$id = id;
        this.Text = json.Text;
        if (this.$id.includes("Alter_Moves")) {
            this.By = (_a = json.By) !== null && _a !== void 0 ? _a : { Player: true, Ally: false };
        }
        this["Options"] = (_b = json.Options) === null || _b === void 0 ? void 0 : _b.map((option, index) => new MoveTriggerOption(option, this, index));
    }
}
//# sourceMappingURL=MoveTrigger.js.map