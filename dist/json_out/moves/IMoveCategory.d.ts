import type { IHasDescription, IHasDisplay, IHasSource } from "../index.js";
import type { IDisplay } from "../meta/IDisplay.js";
import type { IHasId, IHasName } from "../meta/IHas.js";
import type { IMove } from "./IMove.js";
import type { MoveCategoryId } from "./MoveCategoryId.js";
import type { MoveCategoryName } from "./MoveCategoryName.js";
import type { RequireKey } from "../../utils/types/RequireKey.js";
/**
 * Represents a category of moves such as "Session Moves" or "Combat Moves", and serves as a container for moves within that category.
 */
export interface IMoveCategory extends IHasId<MoveCategoryId>, IHasName, IHasSource, IHasDescription, IHasDisplay<RequireKey<IDisplay, "Color">> {
    /**
     * @example "Moves/Adventure"
     */
    $id: MoveCategoryId;
    /**
     * @example "Adventure"
     */
    Name: MoveCategoryName;
    Moves: IMove[];
}
//# sourceMappingURL=IMoveCategory.d.ts.map