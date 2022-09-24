import type { AttributeKey , AttributeMaster } from "@schema_json";
/**
 * @alpha
 */
export type AttributeValue<K extends AttributeKey> = AttributeMaster[K];