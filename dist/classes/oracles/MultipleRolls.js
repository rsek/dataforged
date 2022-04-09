import { badJsonError } from "../../utils/logging/badJsonError.js";
import { is } from "typescript-is";
export class MultipleRolls {
    constructor(json) {
        this.Amount = 2;
        this["Allow duplicates"] = false;
        this["Make it worse"] = false;
        if (!is(json)) {
            throw badJsonError(this.constructor, json);
        }
        this.Amount = json.Amount;
        this["Allow duplicates"] = json["Allow duplicates"] ?? this["Allow duplicates"];
        this["Make it worse"] = json["Make it worse"] ?? this["Make it worse"];
    }
}
//# sourceMappingURL=MultipleRolls.js.map