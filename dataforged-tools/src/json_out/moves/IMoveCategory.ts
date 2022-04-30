import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { IHasDescription , IHasDisplay , IHasSource } from "@json_out/index.js";
import type { IDisplayWithTitle } from "@json_out/meta/IDisplay.js";
import type { IHasId, IHasName } from "@json_out/meta/IHas.js";
import type { IMove } from "@json_out/moves/IMove.js";

/**
 * @internal
 * @asType string
 */
export type MoveCategoryTitle = `${MoveCategoryName} Moves`;

/**
 * "Assets" is also valid, technically, but it's only used in IDs, so it's omitted here.
 * @public
 */
export enum MoveCategoryName {
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
    Fate = "Fate",
}


/**
 * @internal
 * @asType string
 */
export type MoveCategoryId = `${Gamespace}/${MoveCategoryIdBase}`;
/**
 * @internal
 * @asType string
 */
export type MoveCategoryIdBase = `Moves/${MoveCategoryName|"Assets"}`;

/**
 * Represents a category of moves such as "Session Moves" or "Combat Moves", and serves as a container for moves within that category.
 * @public
 */
export interface IMoveCategory extends IHasId, IHasName, IHasSource, IHasDescription, IHasDisplay {
  /**
   * @example "Starforged/Moves/Adventure"
   * @pattern ^(Starforged|Ironsworn)/Moves/[A-z_-]+$
   */
  $id: string;
  /**
   * @example "Adventure"
   */
  Name: string;
  Moves: IMove[];
  Display: IDisplayWithTitle;
}