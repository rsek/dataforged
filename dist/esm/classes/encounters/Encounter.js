/**
 * @internal
 */
export class Encounter {
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
//# sourceMappingURL=Encounter.js.map