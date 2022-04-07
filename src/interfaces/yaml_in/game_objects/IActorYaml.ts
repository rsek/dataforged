import type IGameObjectBase from "@dataforged/interfaces/json_out/common/IGameObjectBase.js";
import type ActorType from "@dataforged/constants/ActorType.js";

export default interface IActorYaml extends IGameObjectBase {
  "Object type": ActorType;
}