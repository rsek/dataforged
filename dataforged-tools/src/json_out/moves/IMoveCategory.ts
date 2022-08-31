import type { IDisplay , IHasDescription , IHasDisplay , IHasId, IHasOptional, IHasSource , IHasTitle, IMove } from "@json_out/index.js";

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
 * Represents a category of moves such as "Session Moves" or "Combat Moves", and serves as a container for moves within that category.
 * @public
 */
export interface IMoveCategory extends IHasId,  IHasSource, IHasDescription, IHasDisplay, IHasOptional,IHasTitle {
  /**
   * @example "Starforged/Moves/Adventure"
   * @pattern ^(Starforged|Ironsworn)/Moves/[A-z_-]+$
   */
  $id: string;
  Moves: IMove[];
  Display: IDisplay;
}