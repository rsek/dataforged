"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncounterIronsworn = void 0;
const Source_js_1 = require("../common/Source.js");
const Encounter_js_1 = require("./Encounter.js");
/**
 * @internal
 */
class EncounterIronsworn extends Encounter_js_1.Encounter {
    constructor(json, parent) {
        var _a;
        super(json);
        this.$id = `${parent.$id}/${this.Name.replaceAll(" ", "_")}`;
        this.Nature = parent.Name;
        this.Display = (_a = json.Display) !== null && _a !== void 0 ? _a : { Title: this.Name };
        this.Source = new Source_js_1.Source(json.Source);
        this["Your Truth"] = json["Your Truth"];
    }
}
exports.EncounterIronsworn = EncounterIronsworn;
//# sourceMappingURL=EncounterIronsworn.js.map