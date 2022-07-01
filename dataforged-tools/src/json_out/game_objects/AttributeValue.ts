//License: MIT
import type { AttributeKey , IAttributeMaster } from "@json_out/index.js";
/**
 * @alpha
 */
export type AttributeValue<K extends AttributeKey> = IAttributeMaster[K];