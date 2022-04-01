import _ from "lodash-es";
import { is } from "typescript-is";
import type AttributeHash from "./AttributeHash.js";
import type GameObjectData from "./GameObjectYaml.js";
import type IGameObject from "./IGameObject.js";
import type { GameObjectType } from "./IGameObjectBase.js";
import badJsonError from "../../functions/logging/badJsonError.js";
import type IRequirementsYaml from "../general/interfaces/IRequirementsYaml.js";
import Requirements from "../general/Requirements.js";

export default class GameObject implements IGameObject {
  "Object type": GameObjectType;
  Requires?: Requirements | undefined;
  "Inherit rolls"?: boolean | undefined;
  constructor(json: GameObjectData) {
    if (!is<GameObjectType>(json["Object type"])) {
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