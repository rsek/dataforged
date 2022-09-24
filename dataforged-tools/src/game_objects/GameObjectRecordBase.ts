import type { AttributeHash } from "@utils";
import type { AttributeKey, GameObjectType } from "@schema_json";

/**
 * @internal
 */
export type GameObjectRecordBase<T extends GameObjectType, K extends AttributeKey> = {
  "Object type": T;
  "Inherit rolls"?: boolean | undefined;
} & AttributeHash<K>;


