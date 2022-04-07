import type { GameObjectType } from "@dataforged/interfaces/json_out/common/IGameObjectBase.js";
import type IRequirements from "@dataforged/interfaces/json_out/common/IRequirements.js";

export default interface IGameObject {
  "Object type": GameObjectType;
  Requires?: IRequirements | undefined;
}
