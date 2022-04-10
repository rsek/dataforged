import { CustomStatOption } from "../index.js";
export class ActionRoll {
    constructor(json, parent) {
        this.Stat = json.Stat;
        this["All of"] = json["All of"];
        this["Best of"] = json["Best of"];
        this["Worst of"] = json["Worst of"];
        if (json["Custom stat"]) {
            this["Custom stat"] = json["Custom stat"] ? new CustomStat(json["Custom stat"], parent.$id + "/Custom_stat") : undefined;
        }
    }
}
export class CustomStat {
    constructor(json, id) {
        var _a;
        this.$id = id;
        this.Name = json.Name;
        this.Options = (_a = json.Options) === null || _a === void 0 ? void 0 : _a.map(option => new CustomStatOption(option, `${id}/${option.Name.replaceAll(" ", "_")}`));
    }
}
//# sourceMappingURL=MoveRoll.js.map