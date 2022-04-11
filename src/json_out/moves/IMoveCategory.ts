import type { IHasDescription , IHasDisplay , IHasSource } from "@json_out/index.js";
import type { IDisplay } from "@json_out/meta/IDisplay.js";
import type { IHasId, IHasName } from "@json_out/meta/IHas.js";
import type { IMove } from "@json_out/moves/IMove.js";
import type { MoveCategoryId } from "@json_out/moves/MoveCategoryId.js";
import type { MoveCategoryName } from "@json_out/moves/MoveCategoryName.js";
import type { RequireKey } from "@utils/types/RequireKey.js";

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