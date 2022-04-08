import type { IRequirements } from "@dataforged/interfaces/json_out/common/IRequirements.js";
import type { GameObjectType } from "@dataforged/interfaces/json_out/oracles/IGameObjectBase.js";

export interface IGameObject {
  "Object type": GameObjectType;
  Requires?: IRequirements | undefined;
}
