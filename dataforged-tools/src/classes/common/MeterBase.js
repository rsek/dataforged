/**
 * Class representing a counter embedded in a Starforged Asset.
 * @internal
 */
export class MeterBase {
    /**
     * @param json - the json object to build the counter from
     * @param id - the id of the Counter
     */
    constructor(json, id) {
        var _a, _b;
        this.Min = 0;
        this["Value"] = 0;
        this.$id = id;
        this.Name = json.Name;
        this.Max = json.Max;
        this.Min = (_a = json.Min) !== null && _a !== void 0 ? _a : 0;
        this["Value"] = (_b = json["Value"]) !== null && _b !== void 0 ? _b : 0;
    }
}
