//License: MIT
import type { IActorRecord } from "@game_objects/index.js";
import type { AttributeKey, GameObjectType } from "@json_out/index.js";

/**
 * @internal
 */
export type ICharacterRecord = IActorRecord<GameObjectType.Character, AttributeKey.Disposition|AttributeKey.Role>;