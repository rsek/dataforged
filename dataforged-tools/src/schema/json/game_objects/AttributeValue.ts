import type { AttributeKey, AttributeMaster } from "@schema";
/**
 * @public
 */
export type AttributeValue<K extends AttributeKey> = AttributeMaster[K];