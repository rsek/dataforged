import { Source } from "@classes/index.js";
/**
 * @internal
 */
export class EncounterVariant {
    constructor(json, parent) {
        var _a, _b;
        this.$id = (`${parent.$id}/${json.Name.replaceAll(" ", "_")}`);
        this.Source = new Source(parent.Source);
        this.Name = json.Name;
        this.Rank = json.Rank;
        this.Display = (_a = json.Display) !== null && _a !== void 0 ? _a : { Title: this.Name };
        if (!this.Display.Title) {
            this.Display.Title = this.Name;
        }
        this.Description = json.Description;
        this.Nature = (_b = json.Nature) !== null && _b !== void 0 ? _b : parent.Nature;
        this["Variant of"] = parent.$id;
        this.Tags = json.Tags;
    }
}
