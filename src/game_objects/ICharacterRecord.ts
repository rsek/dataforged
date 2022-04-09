import type { ActorType, IActorRecord } from "@game_objects/index.js";
import type { AttributeKey } from "@json_out/index.js";


export type ICharacterRecord = IActorRecord<ActorType.Character, AttributeKey.Disposition|AttributeKey.Role>;