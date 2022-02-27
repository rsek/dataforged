import badJsonError from "../../functions/logging/badJsonError";
import GameObjectData from "./GameObjectYaml";

export type AttributeKey = keyof Omit<GameObjectData, "Object type">;

export type AttributeValue = GameObjectData[keyof Omit<GameObjectData, "Object type">];

export default interface IAttribute {
  Key: AttributeKey;
  Value?: AttributeValue;
}

