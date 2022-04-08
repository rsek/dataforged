import type { ActorType, IGameObjectBase } from "@dataforged/json_out/index.js";

export interface IActorYaml extends IGameObjectBase {
  "Object type": ActorType;
}