import type { GameObjectType } from "../../game_objects/index.js";
import type { IRequirements } from "../index.js";
/**
 * Describes a game object, with optional required parameters (for example, a specific Location result).
 * @public
 */
export interface IGameObject {
    "Object type": GameObjectType;
    Requires?: IRequirements | undefined;
}
//# sourceMappingURL=IGameObject.d.ts.map