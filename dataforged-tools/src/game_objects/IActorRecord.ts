import type { IGameObjectRecordBase } from "@game_objects/index.js";
import type { AttributeKey, GameObjectType } from "@json_out/index.js";
/**
 * @public
 */
export type IActorRecord<T extends GameObjectType.Character|GameObjectType.Creature|GameObjectType.Faction, K extends AttributeKey> = IGameObjectRecordBase<T,K>;