import type { AttributeKey, GameObjectType } from "@dataforged/json_out/index.js";
import type { AttributeHash } from "../../dist/utils/types/AttributeHash.js";
export declare type IGameObjectRecordBase<T extends GameObjectType, K extends AttributeKey> = {
    "Object type": T;
    "Inherit rolls"?: boolean | undefined;
} & AttributeHash<K>;
//# sourceMappingURL=IGameObjectRecordBase.d.ts.map