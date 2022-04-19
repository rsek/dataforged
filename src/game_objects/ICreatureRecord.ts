import type { ActorType , IActorRecord } from "@game_objects/index.js";
import type { AttributeKey } from "@json_out/index.js";
/**
 * @public
 */
export type ICreatureRecord = IActorRecord<
  ActorType.Creature,
  AttributeKey.Environment|
  AttributeKey.CreatureScale|
  AttributeKey.Behavior
>;