import { badJsonError } from "../../utils/logging/badJsonError.js";
import { is } from "typescript-is";
/**
 * Represents "Roll twice" and "Roll three times" oracle results.
 * @internal
 */
export class MultipleRolls {
    constructor(json) {
        var _a, _b;
        /**
         * In tabletop play, duplicate results are typically rerolled (p. XX). However, a handful of tables (such as Space Sighting) use multiple rolls to represent discrete objects (rather than features of a single game object), so duplicate results should be allowed.
         */
        this.Amount = 2;
        /** The number of results to be generated from the oracle table. */
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
        this["Allow duplicates"] = (_a = json["Allow duplicates"]) !== null && _a !== void 0 ? _a : this["Allow duplicates"];
        this["Make it worse"] = (_b = json["Make it worse"]) !== null && _b !== void 0 ? _b : this["Make it worse"];
    }
}
//# sourceMappingURL=MultipleRolls.js.map