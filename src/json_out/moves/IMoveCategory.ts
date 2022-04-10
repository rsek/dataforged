import type { ParagraphsString } from "@json_out/common/MdString.js";
import type { IDisplay } from "@json_out/meta/IDisplay.js";
import type { ISource } from "@json_out/meta/ISource.js";
import type { IMove } from "@json_out/moves/IMove.js";
import type { MoveCategoryId } from "@json_out/moves/MoveCategoryId.js";
import type { MoveCategoryName } from "@json_out/moves/MoveCategoryName.js";
import type { RequireKey } from "@utils/types/RequireKey.js";

/**
 * Represents a category of moves such as "Session Moves" or "Combat Moves", and serves as a container for moves within that category.
 */
export interface IMoveCategory {
  /**
   * @example `"Moves/Adventure"`
   */
  $id: MoveCategoryId;
  /**
   * @example `"Adventure"`
   */
  Name: MoveCategoryName;
  Source: ISource;
  Description: ParagraphsString;
  Moves: IMove[];
  Display: RequireKey<IDisplay, "Color">
}