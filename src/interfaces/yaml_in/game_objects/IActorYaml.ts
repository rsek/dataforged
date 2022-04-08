import type { ActorType } from "@dataforged/constants/ActorType.js";
import type { IGameObjectBase } from "@dataforged/interfaces/json_out/oracles/IGameObjectBase.js";

export default interface IActorYaml extends IGameObjectBase {
  "Object type": ActorType;
}