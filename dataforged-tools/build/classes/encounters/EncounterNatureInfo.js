import { EncounterIronsworn } from "./EncounterIronsworn.js";
import { Gamespace } from "../../json_out/index.js";
/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @internal
 */
export class EncounterNatureInfo {
    constructor(json) {
        var _a;
        this.$id = `${Gamespace.Ironsworn}/Encounters/${json.Name}`;
        this.Name = json.Name;
        this.Source = json.Source;
        const displayTitle = json.Name;
        // TODO: should pluralize, probably
        this.Display = (_a = json.Display) !== null && _a !== void 0 ? _a : { Title: displayTitle };
        if (!this.Display.Title) {
            this.Display.Title = displayTitle;
        }
        this.Summary = json.Summary;
        this.Description = json.Description;
        this.Encounters = json.Encounters.map(enc => new EncounterIronsworn(enc, this));
    }
}
//# sourceMappingURL=EncounterNatureInfo.js.map