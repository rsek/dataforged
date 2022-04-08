import type { GameObjectYaml } from "@dataforged/yaml_in/index.js";

export type AttributeKey = keyof Omit<GameObjectYaml, "Object type">;

export type AttributeValue = GameObjectYaml[keyof Omit<GameObjectYaml, "Object type">];

export interface IAttribute {
  Key: AttributeKey;
  Value?: AttributeValue;
}

