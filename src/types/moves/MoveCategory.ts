import type IMoveCategoryYaml from "./IMoveCategoryYaml.js";
import Move from "./Move.js";
import type MoveCategoryName from "./MoveCategoryName.js";
import type ISource from "../general/interfaces/ISource.js";
import Source from "../general/Source.js";

export default class MoveCategory implements IMoveCategoryYaml {
  $id: string;
  Name: MoveCategoryName;
  Source: Source;
  Description: string;
  Moves: Move[];
  constructor(json: IMoveCategoryYaml, ...ancestorSourceJson: ISource[]) {
    this.$id = `Moves / ${json.Name}`;
    this.Name = json.Name;
    this.Description = json.Description;
    this.Source = new Source(json.Source, ...ancestorSourceJson);
    this.Moves = json.Moves.map(move => new Move(move));
  }
}