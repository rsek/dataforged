"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncounterStarforged = void 0;
const index_js_1 = require("../index.js");
const Gamespace_js_1 = require("../../json_out/common/Gamespace.js");
/**
 * Represents an *Ironsworn: Starforged* Encounter entry.
 * @internal
 */
class EncounterStarforged {
    constructor(json, ...ancestorSourceJson) {
        var _a;
        const gamespace = Gamespace_js_1.Gamespace.Starforged;
        this.$id = `${gamespace}/Encounters/${json.Name.replaceAll(" ", "_")}`;
        this.Name = json.Name;
        this.Nature = json.Nature;
        this.Summary = json.Summary;
        this.Tags = json.Tags;
        this.Rank = json.Rank;
        this.Display = new index_js_1.EncounterDisplay((_a = json.Display) !== null && _a !== void 0 ? _a : {}, this.Name);
        this.Features = json.Features;
        this.Drives = json.Drives;
        this.Tactics = json.Tactics;
        const newSource = new index_js_1.Source(json.Source, ...ancestorSourceJson);
        this.Description = json.Description;
        this["Quest Starter"] = json["Quest Starter"];
        this.Source = newSource;
        this.Variants = json.Variants.map(variant => new index_js_1.EncounterVariant(variant, this));
    }
}
exports.EncounterStarforged = EncounterStarforged;
//# sourceMappingURL=EncounterStarforged.js.map