import type { GameObjectType , IActorRecord } from "@game_objects/index.js";
import type { AttributeKey } from "@json_out/index.js";
/**
 * @public
 */
export type ICreatureRecord = IActorRecord<
  GameObjectType.Creature,
  AttributeKey.Environment|
  AttributeKey.CreatureScale|
  AttributeKey.Behavior
>;