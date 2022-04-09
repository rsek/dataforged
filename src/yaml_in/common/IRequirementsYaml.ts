import type { AttributeKey } from "@dataforged/json_out/index.js";
import type { AttributeHash } from "@dataforged/utils/types/AttributeHash.js";

export interface IRequirementsYaml<K extends AttributeKey = AttributeKey> {
  Attributes: AttributeHash<K>;
}
