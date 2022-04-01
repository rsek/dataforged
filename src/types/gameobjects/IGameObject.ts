import type { GameObjectType } from "./IGameObjectBase.js";
import type IRequirements from "../general/interfaces/IRequirements.js";

export default interface IGameObject {
  "Object type": GameObjectType;
  Requires?: IRequirements | undefined;
}
