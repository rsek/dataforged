import { Requirements, Suggestions } from "../index.js";
/**
 * @internal
 */
export class OracleUsage {
    Initial;
    "Max rolls";
    Repeatable;
    Suggestions;
    Requires;
    "Allow duplicates";
    "Sets";
    constructor(json) {
        // if (!is<IOracleUsageData>(json)) {
        //   throw new Error();
        // }
        this.Initial = json.Initial;
        this["Max rolls"] = json["Max rolls"];
        this.Repeatable = json.Repeatable;
        this["Allow duplicates"] = json["Allow duplicates"] ?? false;
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