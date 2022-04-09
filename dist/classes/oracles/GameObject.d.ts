import { Requirements } from "../index.js";
import type { GameObjectType } from "../../game_objects/enum/GameObjectType.js";
import type { GameObjectRecord } from "../../game_objects/index.js";
import type { IGameObject } from "../../json_out/index.js";
export declare class GameObject implements IGameObject {
    "Object type": GameObjectType;
    Requires?: Requirements | undefined;
    "Inherit rolls"?: boolean | undefined;
    constructor(json: GameObjectRecord);
}
//# sourceMappingURL=GameObject.d.ts.map