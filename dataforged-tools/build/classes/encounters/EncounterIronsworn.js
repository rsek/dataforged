import { Source } from "../common/Source.js";
import { Encounter } from "./Encounter.js";
import { toIdFragment } from "../../utils/toIdFragment.js";
/**
 * @internal
 */
export class EncounterIronsworn extends Encounter {
    constructor(json, parent) {
        var _a;
        super(json);
        this.$id = `${parent.$id}/${toIdFragment(this.Name)}`;
        this.Nature = parent.Name;
        this.Display = (_a = json.Display) !== null && _a !== void 0 ? _a : { Title: this.Name };
        this.Source = new Source(json.Source);
        this["Your Truth"] = json["Your Truth"];
    }
}
//# sourceMappingURL=EncounterIronsworn.js.map