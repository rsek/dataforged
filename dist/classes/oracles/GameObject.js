import { Requirements } from "../index.js";
import { ActorType, PlaceType } from "../../game_objects/index.js";
import { badJsonError } from "../../utils/logging/badJsonError.js";
import { enumHas } from "../../utils/validation/enumHas.js";
import _ from "lodash-es";
export class GameObject {
    constructor(json) {
        if (!(enumHas(ActorType, json["Object type"]) || enumHas(PlaceType, json["Object type"]))) {
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