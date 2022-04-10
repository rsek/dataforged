import { Move , Source } from "@classes/index.js";
import type { IDisplay, ISource, MoveCategoryId, MoveCategoryName, MoveCategoryTitle, ParagraphsString } from "@json_out/index.js";
import type { IMoveCategory } from "@json_out/moves/IMoveCategory.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { validateColor } from "@utils/validateColor.js";
import type { IMoveCategoryYaml } from "@yaml_in/moves/IMoveCategoryYaml.js";

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
export class MoveCategory implements IMoveCategory {
  $id: MoveCategoryId;
  Name: MoveCategoryName;
  Source: Source;
  Description: ParagraphsString;
  Moves: Move[];
  Display: MoveCategoryDisplay;
  constructor(json: IMoveCategoryYaml, ...ancestorSourceJson: ISource[]) {
    this.$id = `Moves/${json.Name.replaceAll(" ", "_")}` as MoveCategoryId;
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