"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncounterNatureInfo = void 0;
const EncounterIronsworn_js_1 = require("./EncounterIronsworn.js");
const Gamespace_js_1 = require("../../json_out/common/Gamespace.js");
/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @internal
 */
class EncounterNatureInfo {
    constructor(json) {
        var _a;
        this.$id = `${Gamespace_js_1.Gamespace.Ironsworn}/Encounters/${json.Name}`;
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
        this.Encounters = json.Encounters.map(enc => new EncounterIronsworn_js_1.EncounterIronsworn(enc, this));
    }
}
exports.EncounterNatureInfo = EncounterNatureInfo;
//# sourceMappingURL=EncounterNatureInfo.js.map