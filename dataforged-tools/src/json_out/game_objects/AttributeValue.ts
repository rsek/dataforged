import type { AttributeKey } from "@json_out/game_objects/AttributeKey.js";
import type { IAttributeMaster } from "@json_out/game_objects/IAttributeMaster.js";
/**
 * @alpha
 */
export type AttributeValue<K extends AttributeKey> = IAttributeMaster[K];