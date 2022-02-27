import _ from "lodash";
import Requirements from "../general/Requirements";
import { GameObjectType } from "./IGameObjectBase";
import GameObjectData from "./GameObjectYaml";
import badJsonError from "../../functions/logging/badJsonError";
import { is } from "typescript-is";
import IGameObject from "./IGameObject";
import IRequirementsYaml from "../general/interfaces/IRequirementsYaml";
import AttributeHash from "./AttributeHash";

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
    let requiredAttributes = _.omit(json, ["Object type", "Inherit rolls"]) as AttributeHash;
    if (Object.keys(requiredAttributes).length) {
      let requirements = { Attributes: requiredAttributes } as IRequirementsYaml;
      this.Requires = new Requirements(requirements);
    }
  }
}