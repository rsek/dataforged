import _ from "lodash";
import Requirements from "../general/Requirements";
import { GameObjectType } from "./IGameObjectBase";
import GameObjectData from "./GameObjectData";
import badJsonError from "../../utilities/buildError";
import { is } from "typescript-is";
import IGameObject from "./IGameObject";

export default class GameObject implements IGameObject {
  "Object type": GameObjectType;
  Requires?: Requirements | undefined;
  constructor(json: GameObjectData) {
    // if (!is<GameObjectData>(json)) {
    //   badJsonError(this, json);
    // }
    this["Object type"] = json["Object type"];
    let Attributes = _.omitBy(json, (value, key) => typeof value == "undefined" || key == "Object type");
    if (Object.keys(Attributes).length > 0) {
      this.Requires = new Requirements({ Attributes });
    }
  }
}