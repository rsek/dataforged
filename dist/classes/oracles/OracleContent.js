import { badJsonError } from "../../../dist/utils/logging/badJsonError.js";
import { is } from "typescript-is";
export class OracleContent {
    constructor(json) {
        if (!is(json, object => { function _undefined(object) { ; if (object !== undefined)
            return {};
        else
            return null; } function _string(object) { ; if (typeof object !== "string")
            return {};
        else
            return null; } function sa__string_ea_6(object) { ; if (!Array.isArray(object))
            return {}; for (let i = 0; i < object.length; i++) {
            var error = _string(object[i]);
            if (error)
                return error;
        } return null; } function _null(object) { ; if (object !== null)
            return {};
        else
            return null; } function su__undefined_sa__string_ea_6_6_6_eu(object) { var conditions = [_undefined, sa__string_ea_6]; for (const condition of conditions) {
            var error = condition(object);
            if (!error)
                return null;
        } return {}; } function _0(object) { ; if (typeof object !== "object" || object === null || Array.isArray(object))
            return {}; {
            if ("Part of speech" in object) {
                var error = su__undefined_sa__string_ea_6_6_6_eu(object["Part of speech"]);
                if (error)
                    return error;
            }
        } {
            if ("Tags" in object) {
                var error = su__undefined_sa__string_ea_6_6_6_eu(object["Tags"]);
                if (error)
                    return error;
            }
        } return null; } return _0(object); })) {
            throw badJsonError(this.constructor, json, "Expected IOracleContent");
        }
        this["Part of speech"] = json["Part of speech"] ?? undefined;
        this["Tags"] = json["Tags"] ?? undefined;
    }
}
//# sourceMappingURL=OracleContent.js.map