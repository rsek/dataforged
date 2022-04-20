import type { Gamespace } from "../common/Gamespace.js";
import type { IHasDescription, IHasDisplay, IHasSource } from "../index.js";
import type { IDisplay } from "../meta/IDisplay.js";
import type { IHasId, IHasName } from "../meta/IHas.js";
import type { IMove } from "./IMove.js";
/**
 * @public
 */
export declare type MoveCategoryTitle = `${MoveCategoryName} Moves`;
/**
 * "Assets" is also valid, technically, but it's only used in IDs, so it's omitted here.
 * @public
 */
export declare enum MoveCategoryName {
    Session = "Session",
    Adventure = "Adventure",
    Quest = "Quest",
    Connection = "Connection",
    Exploration = "Exploration",
    Combat = "Combat",
    Suffer = "Suffer",
    Recover = "Recover",
    Threshold = "Threshold",
    Legacy = "Legacy",
    Fate = "Fate"
}
/**
 * @public
 */
export declare type MoveCategoryId = `${Gamespace}/${MoveCategoryIdBase}`;
/**
 * @public
 */
export declare type MoveCategoryIdBase = `Moves/${MoveCategoryName | "Assets"}`;
/**
 * Represents a category of moves such as "Session Moves" or "Combat Moves", and serves as a container for moves within that category.
 * @public
 */
export interface IMoveCategory extends IHasId<MoveCategoryId>, IHasName, IHasSource, IHasDescription, IHasDisplay<IDisplay> {
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