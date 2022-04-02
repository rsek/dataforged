import type IMoveCategoryYaml from "./interfaces/IMoveCategoryYaml.js";
import Move from "./Move.js";
import type { MoveCategoryDisplayName } from "./MoveCategoryDisplayName.js";
import type MoveCategoryId from "./MoveCategoryId.js";
import type MoveCategoryName from "./MoveCategoryName.js";
import type IDisplay from "../../types/general/IDisplay.js";
import type ISource from "../general/interfaces/ISource.js";
import Source from "../general/Source.js";

export class MoveCategoryDisplay implements IDisplay {
  Title: MoveCategoryDisplayName;
  constructor(title: MoveCategoryDisplayName) {
    this.Title = title;
  }
}

export default class MoveCategory implements IMoveCategoryYaml {
  $id: MoveCategoryId;
  Name: MoveCategoryName;
  Source: Source;
  Description: string;
  Moves: Move[];
  Display: MoveCategoryDisplay;
  constructor(json: IMoveCategoryYaml, ...ancestorSourceJson: ISource[]) {
    this.$id = `Moves / ${json.Name}`;
    this.Name = json.Name;
    this.Description = json.Description;
    this.Source = new Source(json.Source, ...ancestorSourceJson);
    this.Display = new MoveCategoryDisplay(`${json.Name} Moves`);
    this.Moves = json.Moves.map(move => new Move(move));
  }
}