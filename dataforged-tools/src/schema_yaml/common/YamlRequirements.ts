import type { AttributeHash } from "@utils/types/AttributeHash.js";
import type { AttributeKey } from "@schema_json";

/**
 * @internal
 */
export interface YamlRequirements<K extends AttributeKey = AttributeKey> {
  Attributes: AttributeHash<K>;
}
