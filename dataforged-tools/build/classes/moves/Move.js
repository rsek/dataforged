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
        super(json.Source ?? {}, ...sourceAncestors);
        this.Category = json.Category ?? `${gamespace}/Moves/Assets`;
        this.$id = json.$id ?? `${this.Category}/${formatIdFragment(json._idFragment ?? json.Name)}`;
        buildLog(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Optional = json.Optional ?? false;
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
            Title: json.Display?.Title ?? this.Name,
            Color: json.Display?.Color ?? parent.Display?.Color
        });
        this.Trigger = new MoveTrigger(json.Trigger, this);
        this.Text = json.Text;
        this.Oracles = json.Oracles;
        this.Outcomes = json.Outcomes ? new MoveOutcomes(json.Outcomes, `${this.$id}/Outcomes`) : undefined;
    }
}
//# sourceMappingURL=Move.js.map