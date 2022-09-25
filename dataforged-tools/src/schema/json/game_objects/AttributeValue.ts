import type { AttributeKey, AttributeMaster } from "@schema";
/**
 * @alpha
 */
export type AttributeValue<K extends AttributeKey> = AttributeMaster[K];