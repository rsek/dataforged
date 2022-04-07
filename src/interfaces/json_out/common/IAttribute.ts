import type GameObjectYaml from "@dataforged/interfaces/yaml_in/game_objects/GameObjectYaml.js";

export type AttributeKey = keyof Omit<GameObjectYaml, "Object type">;

export type AttributeValue = GameObjectYaml[keyof Omit<GameObjectYaml, "Object type">];

export default interface IAttribute {
  Key: AttributeKey;
  Value?: AttributeValue;
}

