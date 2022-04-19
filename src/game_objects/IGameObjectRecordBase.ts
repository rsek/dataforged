import type { AttributeKey, GameObjectType } from "@json_out/index.js";
import type { AttributeHash } from "@utils/types/AttributeHash.js";

/**
 * @public
 */
export type IGameObjectRecordBase<T extends GameObjectType, K extends AttributeKey> = {
  "Object type": T;
  "Inherit rolls"?: boolean | undefined;
} & AttributeHash<K>;


