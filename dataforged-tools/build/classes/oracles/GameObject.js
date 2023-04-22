import { Requirements } from "../index.js";
import _ from "lodash-es";
/**
 * @internal
 */
export class GameObject {
    "Object type";
    Requires;
    "Inherit rolls";
    constructor(json) {
        // TODO: typechecking without recourse to making more goddamn enums
        // if (!(enumHas(ActorType, json["Object type"]) || enumHas(PlaceType, json["Object type"]))) {
        //   throw badJsonError(this.constructor, json, "Invalid object type");
        // }
        this["Object type"] = json["Object type"];
        // this["Inherit rolls"] = json["Inherit rolls"] ?? false;
        const requiredAttributes = _.omit(json, ["Object type", "Inherit rolls"]);
        if (Object.keys(requiredAttributes).length) {
            const requirements = { Attributes: requiredAttributes };
            this.Requires = new Requirements(requirements);
        }
    }
}
//# sourceMappingURL=GameObject.js.map