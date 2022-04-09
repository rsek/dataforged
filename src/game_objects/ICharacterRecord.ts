import type { ActorType, IActorRecord } from "@dataforged/game_objects/index.js";
import type { AttributeKey } from "@dataforged/json_out/index.js";


export type ICharacterRecord = IActorRecord<ActorType.Character, AttributeKey.Disposition|AttributeKey.Role>;