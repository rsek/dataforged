import type { GameObjectType } from "../../game_objects/index.js";
import type { IRequirements } from "../index.js";
/**
 * @public
 */
export interface IGameObject {
    "Object type": GameObjectType;
    Requires?: IRequirements | undefined;
}
//# sourceMappingURL=IGameObject.d.ts.map