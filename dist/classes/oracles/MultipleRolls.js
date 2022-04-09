import { badJsonError } from "../../../dist/utils/logging/badJsonError.js";
import { is } from "typescript-is";
export class MultipleRolls {
    constructor(json) {
        this.Amount = 2;
        this["Allow duplicates"] = false;
        this["Make it worse"] = false;
        if (!is(json, object => { function _number(object) { ; if (typeof object !== "number")
            return {};
        else
            return null; } function _undefined(object) { ; if (object !== undefined)
            return {};
        else
            return null; } function _false(object) { ; if (object !== false)
            return {};
        else
            return null; } function _true(object) { ; if (object !== true)
            return {};
        else
            return null; } function su__undefined__3__4_eu(object) { var conditions = [_undefined, _false, _true]; for (const condition of conditions) {
            var error = condition(object);
            if (!error)
                return null;
        } return {}; } function _0(object) { ; if (typeof object !== "object" || object === null || Array.isArray(object))
            return {}; {
            if ("Amount" in object) {
                var error = _number(object["Amount"]);
                if (error)
                    return error;
            }
            else
                return {};
        } {
            if ("Allow duplicates" in object) {
                var error = su__undefined__3__4_eu(object["Allow duplicates"]);
                if (error)
                    return error;
            }
        } {
            if ("Make it worse" in object) {
                var error = su__undefined__3__4_eu(object["Make it worse"]);
                if (error)
                    return error;
            }
        } return null; } return _0(object); })) {
            throw badJsonError(this.constructor, json);
        }
        this.Amount = json.Amount;
        this["Allow duplicates"] = json["Allow duplicates"] ?? this["Allow duplicates"];
        this["Make it worse"] = json["Make it worse"] ?? this["Make it worse"];
    }
}
//# sourceMappingURL=MultipleRolls.js.map