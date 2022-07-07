import type { IActorRecord } from "@game_objects/IActorRecord.js";
import type { FactionType, GameObjectType } from "@game_objects/index.js";
import type { AttributeKey } from "@json_out/index.js";
/**
 * @internal
 */
export type IFactionRecord = IActorRecord<GameObjectType.Faction,
  AttributeKey.FactionType|
  AttributeKey.Influence
>;
/**
 * @internal
 */
export type IFactionGuildRecord = IActorRecord<GameObjectType.Faction,
  AttributeKey.FactionType|
  AttributeKey.Influence|
  AttributeKey.Guild
> & {
  [AttributeKey.FactionType]: FactionType.Guild
};
/**
 * @internal
 */
export type IFactionFringeGroupRecord = IActorRecord<GameObjectType.Faction,
  AttributeKey.FactionType|
  AttributeKey.Influence|
  AttributeKey.FringeGroup
> & {
  [AttributeKey.FactionType]: FactionType.FringeGroup
};
/**
 * @internal
 */
export type IFactionDominionRecord = IActorRecord<GameObjectType.Faction,
  AttributeKey.FactionType|
  AttributeKey.Influence|
  AttributeKey.Leadership|
  AttributeKey.Dominion
> & {
  [AttributeKey.FactionType]: FactionType.Dominion
};
