/**
 * Represents "Roll twice" and "Roll three times" oracle results.
 * @internal
 */
export class MultipleRolls {
    Amount;
    "Allow duplicates";
    "Make it worse";
    constructor(json) {
        this.Amount = json.Amount ?? 2;
        this["Allow duplicates"] = json["Allow duplicates"] ?? false;
        this["Make it worse"] = json["Make it worse"] ?? false;
    }
}
//# sourceMappingURL=MultipleRolls.js.map