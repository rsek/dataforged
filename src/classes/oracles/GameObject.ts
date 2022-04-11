import { Requirements } from "@classes/index.js";
import type { GameObjectType } from "@game_objects/enum/GameObjectType.js";
import type { GameObjectRecord } from "@game_objects/index.js";
import { ActorType, PlaceType } from "@game_objects/index.js";
import type { IGameObject } from "@json_out/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import type { AttributeHash } from "@utils/types/AttributeHash.js";
import { enumHas } from "@utils/validation/enumHas.js";
import type { IRequirementsYaml } from "@yaml_in/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class GameObject implements IGameObject {
  "Object type": GameObjectType;
  Requires?: Requirements | undefined;
  "Inherit rolls"?: boolean | undefined;
  constructor(json: GameObjectRecord) {
    if (!(enumHas(ActorType, json["Object type"]) || enumHas(PlaceType, json["Object type"]))) {
      throw badJsonError(this.constructor, json, "Invalid object type");
    }
    this["Object type"] = json["Object type"];
    // this["Inherit rolls"] = json["Inherit rolls"] ?? false;
    const requiredAttributes = _.omit(json, [ "Object type", "Inherit rolls" ]) as AttributeHash;
    if (Object.keys(requiredAttributes).length) {
      const requirements = { Attributes: requiredAttributes } as IRequirementsYaml;
      this.Requires = new Requirements(requirements);
    }
  }
}