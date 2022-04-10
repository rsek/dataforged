import { Source } from "../index.js";
import { EncounterDisplay } from "../index.js";
import { EncounterVariant } from "../index.js";
export class Encounter {
    constructor(json, ...ancestorSourceJson) {
        this.$id = `Encounters/${json.Name.replaceAll(" ", "_")}`;
        this.Name = json.Name;
        this.Nature = json.Nature;
        this.Summary = json.Summary;
        this.Tags = json.Tags;
        this.Rank = json.Rank;
        this.Display = new EncounterDisplay(json.Display ?? {}, this.Name);
        this.Features = json.Features;
        this.Drives = json.Drives;
        this.Tactics = json.Tactics;
        const newSource = new Source(json.Source, ...ancestorSourceJson);
        this.Variants = json.Variants?.map(variant => new EncounterVariant(variant, newSource));
        this.Description = json.Description;
        this["Quest Starter"] = json["Quest Starter"];
        this.Source = newSource;
    }
}
//# sourceMappingURL=Encounter.js.map