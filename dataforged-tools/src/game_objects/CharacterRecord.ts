import type { ActorRecord } from "@game_objects";
import type { AttributeKey, GameObjectType } from "@schema";

/**
 * @public
 */
export type CharacterRecord = ActorRecord<GameObjectType.Character, AttributeKey.Disposition|AttributeKey.Role>;