export class Counter {
    constructor(json, id) {
        this.Min = 0;
        this["Starting Value"] = 0;
        this.$id = id;
        this.Name = json.Name;
        this.Max = json.Max ?? null;
        this.Min = json.Min ?? 0;
        this["Starting Value"] = json["Starting Value"] ?? 0;
    }
}
//# sourceMappingURL=Counter.js.map