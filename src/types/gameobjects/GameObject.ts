import _ from "lodash";
import { Requirements } from "../general/Requirements";
import IGameObjectData, { GameObjectType, isGameObjectData } from "./IGameObjectData";
import IAttributeOptions from "./IAttributeOptions";

export default class GameObject {
  "Object type": GameObjectType;
  Requires?: Requirements | undefined;
  constructor(json: IGameObjectData) {
    if (!isGameObjectData(json)) {
      throw new Error(`[GameObject.constructor] json isn't IGameObjectData ${JSON.stringify(json)}`);
    }
    this["Object type"] = json["Object type"];
    let attributeObj = _.omitBy(json, (value, key) => typeof value == "undefined" || key == "Object type");
    if (Object.keys(attributeObj)?.length > 0) {
      let Attributes = _.map(attributeObj, (Value, Key) => {
        let Values: IAttributeOptions["Values"] = Array.isArray(Value) ? Value : typeof Value == "string" ? [Value] : [];
        return { Key, Values };
      });
      this.Requires = new Requirements({ Attributes });
    }
  }
}