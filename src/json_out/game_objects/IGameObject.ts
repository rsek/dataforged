import type { GameObjectType , IRequirements } from "@dataforged/json_out/index.js";

export interface IGameObject {
  "Object type": GameObjectType;
  Requires?: IRequirements | undefined;
}
