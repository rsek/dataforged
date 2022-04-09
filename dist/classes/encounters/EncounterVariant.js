import { Source } from "../../../dist/classes/common/Source.js";
export class EncounterVariant {
    constructor(json, ancestorSourceJson) {
        this.$id = (`Encounters / ${json.Name}`);
        Object.assign(this, json);
        this.Source = new Source(ancestorSourceJson);
    }
}
//# sourceMappingURL=EncounterVariant.js.map