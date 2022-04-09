import { ActionRoll } from "../index.js";
export class MoveTriggerOption {
    constructor(json, id) {
        this.$id = id;
        this.Text = json.Text;
        if (json["Action roll"]) {
            this["Action roll"] = new ActionRoll(json["Action roll"], this);
        }
        this["Progress roll"] = json["Progress roll"];
    }
}
//# sourceMappingURL=MoveTriggerOption.js.map