import _ from "lodash";
import Requirements from "../general/Requirements";
import IGameObjectBase, { GameObjectType, isGameObjectData } from "./IGameObjectBase";
import IAttributeOptions from "./IAttributeOptions";
import GameObjectData from "./GameObjectData";

export default class GameObject {
  "Object type": GameObjectType;
  Requires?: Requirements | undefined;
  constructor(json: GameObjectData) {
    if (!isGameObjectData(json)) {
      throw new Error(`[GameObject.constructor] json isn't IGameObjectData ${JSON.stringify(json)}`);
    }
    this["Object type"] = json["Object type"];
    let Attributes = _.omitBy(json, (value, key) => typeof value == "undefined" || key == "Object type");
    if (Object.keys(Attributes).length > 0) {
      this.Requires = new Requirements({ Attributes });
    }
  }
}