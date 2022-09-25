import type { ActorRecord, FactionType, GameObjectType } from "@game_objects";
import type { AttributeKey } from "@schema";
/**
 * @internal
 */
export type FactionRecord = ActorRecord<GameObjectType.Faction,
  AttributeKey.FactionType|
  AttributeKey.Influence
>;
/**
 * @internal
 */
export type FactionGuildRecord = ActorRecord<GameObjectType.Faction,
  AttributeKey.FactionType|
  AttributeKey.Influence|
  AttributeKey.Guild
> & {
  [AttributeKey.FactionType]: FactionType.Guild
};
/**
 * @internal
 */
export type FactionFringeGroupRecord = ActorRecord<GameObjectType.Faction,
  AttributeKey.FactionType|
  AttributeKey.Influence|
  AttributeKey.FringeGroup
> & {
  [AttributeKey.FactionType]: FactionType.FringeGroup
};
/**
 * @internal
 */
export type FactionDominionRecord = ActorRecord<GameObjectType.Faction,
  AttributeKey.FactionType|
  AttributeKey.Influence|
  AttributeKey.Leadership|
  AttributeKey.Dominion
> & {
  [AttributeKey.FactionType]: FactionType.Dominion
};
