import { GameObjectType } from "./IGameObjectBase";
import IRequirements from "../general/interfaces/IRequirements";

export default interface IGameObject {
  "Object type": GameObjectType;
  Requires?: IRequirements | undefined;
}
