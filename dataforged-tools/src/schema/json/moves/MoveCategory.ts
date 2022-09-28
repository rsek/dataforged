import type { HasDescription, HasDisplay, HasId, HasOptional, HasSource, HasTitle, Move } from "@schema";

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
export interface MoveCategory extends HasId, HasSource, HasDescription, HasDisplay, HasOptional, HasTitle {
  /**
   * @example "starforged/moves/adventure"
   * @pattern ^(starforged|ironsworn)/moves/[a-z_-]+$
   */
  $id: string;
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  Moves: {[key:string]: Move};
}