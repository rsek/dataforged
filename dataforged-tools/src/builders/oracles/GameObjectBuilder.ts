import { RequirementsBuilder } from "@builders";
import type { GameObjectRecord } from "@game_objects";
import type { GameObjectType } from "@game_objects/enum/GameObjectType.js";
import type { GameObject, Requirements , YamlRequirements } from "@schema";
import type { AttributeHash } from "@utils/types/AttributeHash.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class GameObjectBuilder implements GameObject {
  "Object type": GameObjectType;
  Requires?: Requirements | undefined;
  "Inherit rolls"?: boolean | undefined;
  constructor(yaml: GameObjectRecord) {
    // TODO: typechecking without recourse to making more goddamn enums
    // if (!(enumHas(ActorType, json["Object type"]) || enumHas(PlaceType, json["Object type"]))) {
    //   throw badJsonError(this.constructor, json, "Invalid object type");
    // }
    this["Object type"] = yaml["Object type"];
    // this["Inherit rolls"] = json["Inherit rolls"] ?? false;
    const requiredAttributes = _.omit(yaml, [ "Object type", "Inherit rolls" ]) as AttributeHash;
    if (Object.keys(requiredAttributes).length) {
      const requirements = { Attributes: requiredAttributes } as YamlRequirements;
      this.Requires = new RequirementsBuilder(requirements);
    }
  }
}