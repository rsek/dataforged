import type { GameObjectRecordBase } from "@game_objects";
import type { AttributeKey, GameObjectType } from "@schema";
/**
 * @public
 */
export type ActorRecord<T extends GameObjectType.Character|GameObjectType.Creature|GameObjectType.Faction, K extends AttributeKey> = GameObjectRecordBase<T,K>;