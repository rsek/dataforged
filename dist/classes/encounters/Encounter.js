import { Source } from "../index.js";
import { EncounterDisplay } from "../index.js";
import { EncounterVariant } from "../index.js";
export class Encounter {
    constructor(json, ...ancestorSourceJson) {
        var _a, _b;
        this.$id = `Encounters/${json.Name.replaceAll(" ", "_")}`;
        this.Name = json.Name;
        this.Nature = json.Nature;
        this.Summary = json.Summary;
        this.Tags = json.Tags;
        this.Rank = json.Rank;
        this.Display = new EncounterDisplay((_a = json.Display) !== null && _a !== void 0 ? _a : {}, this.Name);
        this.Features = json.Features;
        this.Drives = json.Drives;
        this.Tactics = json.Tactics;
        const newSource = new Source(json.Source, ...ancestorSourceJson);
        this.Variants = (_b = json.Variants) === null || _b === void 0 ? void 0 : _b.map(variant => new EncounterVariant(variant, newSource));
        this.Description = json.Description;
        this["Quest Starter"] = json["Quest Starter"];
        this.Source = newSource;
    }
}
//# sourceMappingURL=Encounter.js.map