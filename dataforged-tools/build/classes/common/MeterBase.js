/**
 * Class representing a counter embedded in a Starforged Asset.
 * @internal
 */
export class MeterBase {
    $id;
    Name;
    Min = 0;
    Max;
    "Value" = 0;
    /**
     * @param json - the json object to build the counter from
     * @param id - the id of the Counter
     */
    constructor(json, id) {
        this.$id = id;
        this.Name = json.Name;
        this.Max = json.Max;
        this.Min = json.Min ?? 0;
        this["Value"] = json["Value"] ?? 0;
    }
}
//# sourceMappingURL=MeterBase.js.map