import { badJsonError } from "../../utils/logging/badJsonError.js";
import { is } from "typescript-is";
export class OracleContent {
    constructor(json) {
        if (!is(json)) {
            throw badJsonError(this.constructor, json, "Expected IOracleContent");
        }
        this["Part of speech"] = json["Part of speech"] ?? undefined;
        this["Tags"] = json["Tags"] ?? undefined;
    }
}
//# sourceMappingURL=OracleContent.js.map