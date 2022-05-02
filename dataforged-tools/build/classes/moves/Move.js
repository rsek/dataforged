import { MoveOutcomes, MoveTrigger, SourceInheritor } from "../index.js";
import { buildLog } from "../../utils/logging/buildLog.js";
import { toIdFragment } from "../../utils/toIdFragment.js";
import _ from "lodash-es";
/**
 * Object representing a Starforged move.
 * @internal
 */
export class Move extends SourceInheritor {
    constructor(json, parent, gamespace, ...sourceAncestors) {
        var _a, _b, _c;
        super((_a = json.Source) !== null && _a !== void 0 ? _a : {}, ...sourceAncestors);
        this.Category = (_b = json.Category) !== null && _b !== void 0 ? _b : `${gamespace}/Moves/Assets`;
        this.$id = (_c = json.$id) !== null && _c !== void 0 ? _c : `${this.Category}/${toIdFragment(json.Name)}`;
        buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        if (this.Category === ("Starforged/Moves/Assets" || "Ironsworn/Moves/Assets")) {
            if (!json.Asset) {
                throw new Error("Expected an asset ID");
            }
            this.Asset = json.Asset;
        }
        this.Tags = json.Tags;
        this["Progress Move"] = json["Progress Move"];
        this["Variant of"] = json["Variant of"];
        const displayStub = { Title: this.Name };
        if (json.Display) {
            this.Display = _.merge(displayStub, json.Display);
        }
        else {
            this.Display = displayStub;
        }
        this.Trigger = new MoveTrigger(json.Trigger, `${this.$id}/Trigger`, this);
        this.Text = json.Text;
        this.Oracles = json.Oracles;
        this.Outcomes = json.Outcomes ? new MoveOutcomes(json.Outcomes, `${this.$id}/Outcomes`) : undefined;
    }
}
//# sourceMappingURL=Move.js.map