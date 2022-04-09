import { Requirements } from "../../../dist/classes/common/Requirements.js";
import { badJsonError } from "../../../dist/utils/logging/badJsonError.js";
import _ from "lodash-es";
import { is } from "typescript-is";
export class GameObject {
    constructor(json) {
        if (!is(json["Object type"], object => { function _1(object) { ; if (object !== "Character")
            return {};
        else
            return null; } function _2(object) { ; if (object !== "Creature")
            return {};
        else
            return null; } function _3(object) { ; if (object !== "Faction")
            return {};
        else
            return null; } function _4(object) { ; if (object !== "Derelict")
            return {};
        else
            return null; } function _5(object) { ; if (object !== "Derelict Zone")
            return {};
        else
            return null; } function _6(object) { ; if (object !== "Starship")
            return {};
        else
            return null; } function _7(object) { ; if (object !== "Settlement")
            return {};
        else
            return null; } function _8(object) { ; if (object !== "Planet")
            return {};
        else
            return null; } function _9(object) { ; if (object !== "Precursor Vault")
            return {};
        else
            return null; } function su__1__2__3__4__5__6__7__8__9_eu(object) { var conditions = [_1, _2, _3, _4, _5, _6, _7, _8, _9]; for (const condition of conditions) {
            var error = condition(object);
            if (!error)
                return null;
        } return {}; } return su__1__2__3__4__5__6__7__8__9_eu(object); })) {
            throw badJsonError(this.constructor, json, "Invalid object type");
        }
        this["Object type"] = json["Object type"];
        const requiredAttributes = _.omit(json, ["Object type", "Inherit rolls"]);
        if (Object.keys(requiredAttributes).length) {
            const requirements = { Attributes: requiredAttributes };
            this.Requires = new Requirements(requirements);
        }
    }
}
//# sourceMappingURL=GameObject.js.map