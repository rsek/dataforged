import { SourceInheritor } from "../../../dist/classes/common/SourceInheritor.js";
import { MoveOutcomes } from "../../../dist/classes/moves/MoveOutcomes.js";
import { MoveTrigger } from "../../../dist/classes/moves/MoveTrigger.js";
import { buildLog } from "../../../dist/utils/logging/buildLog.js";
import _ from "lodash-es";
export class Move extends SourceInheritor {
    constructor(json, ...sourceAncestors) {
        super(json.Source ?? {}, ...sourceAncestors);
        this.$id = json.$id ?? `${json.Category} / ${json.Name}`;
        buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Category = json.Category;
        if (this.Category === "Moves / Assets") {
            if (!json.Asset) {
                throw new Error("Expected an asset ID");
            }
            this.Asset = json.Asset;
        }
        this["Progress Move"] = json["Progress Move"];
        this["Variant of"] = json["Variant of"];
        const displayStub = { Title: this.Name };
        if (json.Display) {
            this.Display = _.merge(displayStub, json.Display);
        }
        else {
            this.Display = displayStub;
        }
        this.Trigger = new MoveTrigger(json.Trigger, `${this.$id} / Trigger`);
        this.Text = json.Text;
        this.Oracles = json.Oracles;
        this.Outcomes = json.Outcomes ? new MoveOutcomes(json.Outcomes, `${this.$id} / Outcomes`) : undefined;
    }
}
//# sourceMappingURL=Move.js.map