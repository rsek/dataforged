import type { ActorRecord, GameObjectType } from "@game_objects";
import type { AttributeKey } from "@schema";
/**
 * @internal
 */
export type CreatureRecord = ActorRecord<
  GameObjectType.Creature,
  AttributeKey.Environment|
  AttributeKey.CreatureScale|
  AttributeKey.Behavior
>;