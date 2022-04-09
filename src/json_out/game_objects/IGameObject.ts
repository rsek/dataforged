import type { GameObjectType } from "@dataforged/game_objects/index.js";
import type { IRequirements } from "@dataforged/json_out/index.js";

export interface IGameObject {
  "Object type": GameObjectType;
  Requires?: IRequirements | undefined;
}
