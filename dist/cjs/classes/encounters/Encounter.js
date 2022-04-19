"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encounter = void 0;
/**
 * @internal
 */
class Encounter {
    constructor(json) {
        this.Name = json.Name;
        this.Features = json.Features;
        this.Drives = json.Drives;
        this.Tactics = json.Tactics;
        this.Rank = json.Rank;
        this.Description = json.Description;
        this["Quest Starter"] = json["Quest Starter"];
    }
}
exports.Encounter = Encounter;
//# sourceMappingURL=Encounter.js.map