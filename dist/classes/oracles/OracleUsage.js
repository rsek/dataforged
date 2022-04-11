import { Requirements, Suggestions } from "../index.js";
/**
 * @internal
 */
export class OracleUsage {
    constructor(json) {
        var _a;
        // if (!is<IOracleUsageData>(json)) {
        //   throw new Error();
        // }
        this.Initial = json.Initial;
        this["Max rolls"] = json["Max rolls"];
        this["Min rolls"] = json["Min rolls"];
        this.Repeatable = json.Repeatable;
        this["Allow duplicates"] = (_a = json["Allow duplicates"]) !== null && _a !== void 0 ? _a : false;
        if (json.Suggestions) {
            this.Suggestions = new Suggestions(json.Suggestions);
        }
        if (json.Requires) {
            this.Requires = new Requirements(json.Requires);
        }
        // this["Sets attributes"] = json["Sets attributes"];
    }
}
//# sourceMappingURL=OracleUsage.js.map