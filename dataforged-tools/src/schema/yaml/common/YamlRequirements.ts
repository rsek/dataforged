import type { AttributeKey } from "@schema";
import type { AttributeHash } from "@utils/types/AttributeHash.js";

/**
 * @internal
 */
export interface YamlRequirements<K extends AttributeKey = AttributeKey> {
  Attributes: AttributeHash<K>;
}
