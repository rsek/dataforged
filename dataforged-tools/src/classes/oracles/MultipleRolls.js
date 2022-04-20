/**
 * Represents "Roll twice" and "Roll three times" oracle results.
 * @internal
 */
export class MultipleRolls {
    constructor(json) {
        var _a, _b, _c;
        this.Amount = (_a = json.Amount) !== null && _a !== void 0 ? _a : 2;
        this["Allow duplicates"] = (_b = json["Allow duplicates"]) !== null && _b !== void 0 ? _b : false;
        this["Make it worse"] = (_c = json["Make it worse"]) !== null && _c !== void 0 ? _c : false;
    }
}
