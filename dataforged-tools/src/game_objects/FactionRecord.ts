import type { ActorRecord, FactionType, GameObjectType } from '@game_objects'
import type { AttributeKey } from '@schema'
/**
 * @public
 */
export type FactionRecord = ActorRecord<GameObjectType.Faction,
AttributeKey.FactionType |
AttributeKey.Influence
>
/**
 * @public
 */
export type FactionGuildRecord = ActorRecord<GameObjectType.Faction,
AttributeKey.FactionType |
AttributeKey.Influence |
AttributeKey.Guild
> & {
  [AttributeKey.FactionType]: FactionType.Guild
}
/**
 * @public
 */
export type FactionFringeGroupRecord = ActorRecord<GameObjectType.Faction,
AttributeKey.FactionType |
AttributeKey.Influence |
AttributeKey.FringeGroup
> & {
  [AttributeKey.FactionType]: FactionType.FringeGroup
}
/**
 * @public
 */
export type FactionDominionRecord = ActorRecord<GameObjectType.Faction,
AttributeKey.FactionType |
AttributeKey.Influence |
AttributeKey.Leadership |
AttributeKey.Dominion
> & {
  [AttributeKey.FactionType]: FactionType.Dominion
}
