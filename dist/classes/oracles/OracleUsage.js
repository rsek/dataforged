import { Requirements } from "@dataforged/classes/common/Requirements.js";
import { Suggestions } from "@dataforged/classes/common/Suggestions.js";
export class OracleUsage {
    constructor(json) {
        this.Initial = json.Initial;
        this["Max rolls"] = json["Max rolls"];
        this["Min rolls"] = json["Min rolls"];
        this.Repeatable = json.Repeatable;
        this["Allow duplicates"] = json["Allow duplicates"] ?? false;
        if (json.Suggestions) {
            this.Suggestions = new Suggestions(json.Suggestions);
        }
        if (json.Requires) {
            this.Requires = new Requirements(json.Requires);
        }
    }
}
//# sourceMappingURL=OracleUsage.js.map