import { MoveTriggerOption } from "../../../dist/classes/moves/MoveTriggerOption.js";
export class MoveTrigger {
    constructor(json, id) {
        this.$id = id;
        this.Text = json.Text;
        this.Options = json.Options?.map((option, index) => new MoveTriggerOption(option, `${this.$id} / Options / ${index + 1}`));
    }
}
//# sourceMappingURL=MoveTrigger.js.map