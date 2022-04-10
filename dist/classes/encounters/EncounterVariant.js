import { Source } from "../index.js";
export class EncounterVariant {
    constructor(json, ancestorSourceJson) {
        this.$id = (`Encounters/${json.Name.replaceAll(" ", "_")}`);
        Object.assign(this, json);
        this.Source = new Source(ancestorSourceJson);
    }
}
//# sourceMappingURL=EncounterVariant.js.map