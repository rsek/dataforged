import type { MoveCategoryName } from "@dataforged/constants/MoveCategoryName.js";
import type { IDisplay } from "@dataforged/interfaces/json_out/common/IDisplay.js";
import type { ISource } from "@dataforged/interfaces/json_out/common/ISource.js";
import type { IMove } from "@dataforged/interfaces/json_out/moves/IMove.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";
import type { RequireKey } from "@dataforged/utils/types/RequireKey.js";

export default interface IMoveCategoryYaml {
  Name: MoveCategoryName;
  Source: ISource;
  Description: ParagraphsString;
  Moves: IMove[];
  Display: RequireKey<IDisplay, "Color">
}
