import Source from "@dataforged/classes/common/Source.js";
import Move from "@dataforged/classes/moves/Move.js";
import type { MoveCategoryName } from "@dataforged/constants/MoveCategoryName.js";
import type { IDisplay } from "@dataforged/interfaces/json_out/common/IDisplay.js";
import type { ISource } from "@dataforged/interfaces/json_out/common/ISource.js";
import type { ParagraphsString } from "@dataforged/interfaces/json_out/common/strings/MdString.js";
import type { MoveCategoryId } from "@dataforged/interfaces/json_out/moves/strings/MoveCategoryId.js";
import type { MoveCategoryTitle } from "@dataforged/interfaces/json_out/moves/strings/MoveCategoryTitle.js";
import type IMoveCategoryYaml from "@dataforged/interfaces/yaml_in/moves/IMoveCategoryYaml.js";
import badJsonError from "@dataforged/utils/logging/badJsonError.js";
import validateColor from "@dataforged/utils/validateColor.js";

export class MoveCategoryDisplay implements IDisplay {
  Title: MoveCategoryTitle;
  Color: string;
  constructor(title: MoveCategoryTitle, color: string) {
    this.Title = title;
    if (!validateColor(color)) {
      throw badJsonError(this.constructor,color, "Not a valid color.");
    }
    this.Color = color;
  }
}
export default class MoveCategory implements IMoveCategoryYaml {
  $id: MoveCategoryId;
  Name: MoveCategoryName;
  Source: Source;
  Description: ParagraphsString;
  Moves: Move[];
  Display: MoveCategoryDisplay;
  constructor(json: IMoveCategoryYaml, ...ancestorSourceJson: ISource[]) {
    this.$id = `Moves / ${json.Name}`;
    this.Name = json.Name;
    this.Description = json.Description;
    this.Source = new Source(json.Source, ...ancestorSourceJson);
    this.Display = new MoveCategoryDisplay(`${json.Name} Moves`, json.Display.Color);
    this.Moves = json.Moves.map(move => {
      move.Category = this.$id;
      return new Move(move, this.Source, ...ancestorSourceJson);
    });
  }
}