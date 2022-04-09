import type { ActorType, IGameObjectRecordBase } from "@dataforged/game_objects/index.js";
import type { AttributeKey } from "@dataforged/json_out/index.js";

export type IActorRecord<T extends ActorType, K extends AttributeKey> = IGameObjectRecordBase<T,K>;