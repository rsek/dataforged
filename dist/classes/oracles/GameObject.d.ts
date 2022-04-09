import { Requirements } from "../../../dist/classes/common/Requirements.js";
import type { GameObjectType } from "../../../dist/game_objects/enum/GameObjectType.js";
import type { GameObjectRecord } from "../../../dist/game_objects/index.js";
import type { IGameObject } from "@dataforged/json_out/index.js";
export declare class GameObject implements IGameObject {
    "Object type": GameObjectType;
    Requires?: Requirements | undefined;
    "Inherit rolls"?: boolean | undefined;
    constructor(json: GameObjectRecord);
}
//# sourceMappingURL=GameObject.d.ts.map