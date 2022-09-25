import type {  AttributeKey, GameObjectType } from "@schema";
import type { AttributeHash } from "@utils";

/**
 * @internal
 */
export type GameObjectRecordBase<T extends GameObjectType, K extends AttributeKey> = {
  "Object type": T;
  "Inherit rolls"?: boolean | undefined;
} & AttributeHash<K>;


