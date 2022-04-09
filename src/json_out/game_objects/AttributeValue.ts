import type { AttributeKey } from "@dataforged/json_out/game_objects/AttributeKey.js";
import type { IAttributeMaster } from "@dataforged/json_out/game_objects/IAttributeMaster.js";

export type AttributeValue<K extends AttributeKey = AttributeKey> = IAttributeMaster[K];