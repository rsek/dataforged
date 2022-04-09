import type { ParagraphsString } from "@json_out/common/MdString.js";
import type { IDisplay } from "@json_out/meta/IDisplay.js";
import type { ISource } from "@json_out/meta/ISource.js";
import type { IMove } from "@json_out/moves/IMove.js";
import type { MoveCategoryId } from "@json_out/moves/MoveCategoryId.js";
import type { MoveCategoryName } from "@json_out/moves/MoveCategoryName.js";
import type { RequireKey } from "@utils/types/RequireKey.js";

export interface IMoveCategory {
  $id: MoveCategoryId;
  Name: MoveCategoryName;
  Source: ISource;
  Description: ParagraphsString;
  Moves: IMove[];
  Display: RequireKey<IDisplay, "Color">
}