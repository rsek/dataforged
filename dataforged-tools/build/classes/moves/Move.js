import { DisplayWithTitle } from "../common/Display.js";
import { MoveOutcomes, MoveTrigger, SourceInheritor } from "../index.js";
import { buildLog } from "../../utils/logging/buildLog.js";
import { formatIdFragment } from "../../utils/toIdFragment.js";
/**
 * Object representing a Starforged move.
 * @internal
 */
export class Move extends SourceInheritor {
    constructor(json, parent, gamespace, ...sourceAncestors) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        super((_a = json.Source) !== null && _a !== void 0 ? _a : {}, ...sourceAncestors);
        this.Category = (_b = json.Category) !== null && _b !== void 0 ? _b : `${gamespace}/Moves/Assets`;
        this.$id = (_c = json.$id) !== null && _c !== void 0 ? _c : `${this.Category}/${formatIdFragment(json.Name)}`;
        buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Optional = (_d = json.Optional) !== null && _d !== void 0 ? _d : false;
        if (this.Category === ("Starforged/Moves/Assets" || "Ironsworn/Moves/Assets")) {
            if (!json.Asset) {
                throw new Error("Expected an asset ID");
            }
            this.Asset = json.Asset;
        }
        this.Tags = json.Tags;
        this["Progress Move"] = json["Progress Move"];
        this["Variant of"] = json["Variant of"];
        this.Display = new DisplayWithTitle({
            Title: (_f = (_e = json.Display) === null || _e === void 0 ? void 0 : _e.Title) !== null && _f !== void 0 ? _f : this.Name,
            Color: (_h = (_g = json.Display) === null || _g === void 0 ? void 0 : _g.Color) !== null && _h !== void 0 ? _h : (_j = parent.Display) === null || _j === void 0 ? void 0 : _j.Color
        });
        this.Trigger = new MoveTrigger(json.Trigger, `${this.$id}/Trigger`, this);
        this.Text = json.Text;
        this.Oracles = json.Oracles;
        this.Outcomes = json.Outcomes ? new MoveOutcomes(json.Outcomes, `${this.$id}/Outcomes`) : undefined;
    }
}
//# sourceMappingURL=Move.js.map