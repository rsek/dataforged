/**
 * Class representing a counter embedded in a Starforged Asset.
 */
export class Counter {
    /**
     * @param json - the json object to build the counter from
     * @param id - the id of the Counter
     */
    constructor(json, id) {
        var _a, _b, _c;
        this.Min = 0;
        this["Starting Value"] = 0;
        this.$id = id;
        this.Name = json.Name;
        this.Max = (_a = json.Max) !== null && _a !== void 0 ? _a : null;
        this.Min = (_b = json.Min) !== null && _b !== void 0 ? _b : 0;
        this["Starting Value"] = (_c = json["Starting Value"]) !== null && _c !== void 0 ? _c : 0;
    }
}
//# sourceMappingURL=Counter.js.map