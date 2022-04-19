import type { ActorType, IActorRecord } from "@game_objects/index.js";
import type { AttributeKey } from "@json_out/index.js";

/**
 * @public
 */
export type ICharacterRecord = IActorRecord<ActorType.Character, AttributeKey.Disposition|AttributeKey.Role>;