import type { ActorType, IGameObjectRecordBase } from "@game_objects/index.js";
import type { AttributeKey } from "@json_out/index.js";

export type IActorRecord<T extends ActorType, K extends AttributeKey> = IGameObjectRecordBase<T,K>;