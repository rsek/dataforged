import type IMoveCategoryYaml from "./interfaces/IMoveCategoryYaml.js";
import Move from "./Move.js";
import type { MoveCategoryDisplayName } from "./MoveCategoryDisplayName.js";
import type MoveCategoryId from "./MoveCategoryId.js";
import type MoveCategoryName from "./MoveCategoryName.js";
import badJsonError from "../../functions/logging/badJsonError.js";
import type IDisplay from "../../types/general/IDisplay.js";
import validateColor from "../assets/validateColor.js";
import type ISource from "../general/interfaces/ISource.js";
import Source from "../general/Source.js";
import type { ParagraphsString } from "../general/StringTypes.js";

export class MoveCategoryDisplay implements IDisplay {
  Title: MoveCategoryDisplayName;
  Color: string;
  constructor(title: MoveCategoryDisplayName, color: string) {
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
      return new Move(move);
    });
  }
}