import badJsonError from "../../functions/badJsonError";
import GameObjectData from "./GameObjectData";

export type AttributeKey = keyof Omit<GameObjectData, "Object type">;

export type AttributeValue = GameObjectData[keyof Omit<GameObjectData, "Object type">];

export default interface IAttribute {
  Key: AttributeKey;
  Value?: AttributeValue;
}

