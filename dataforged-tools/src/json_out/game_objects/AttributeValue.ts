import type { AttributeKey } from "@json_out/index.js";
import type { IAttributeMaster } from "@json_out/index.js";
/**
 * @alpha
 */
export type AttributeValue<K extends AttributeKey> = IAttributeMaster[K];