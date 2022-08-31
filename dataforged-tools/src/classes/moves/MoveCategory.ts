import { Display , Move , Source , Title } from "@classes/index.js";
import { MoveCategoryDisplay } from "@classes/moves/MoveCategoryDisplay.js";
import type { Gamespace , IMoveCategory, ISource } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IMoveCategoryYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class MoveCategory implements IMoveCategory {
  $id: IMoveCategory["$id"];
  Title: Title;
  Source: Source;
  Description: string;
  Moves: Move[];
  Display: Display;
  Optional: boolean;
  constructor(json: IMoveCategoryYaml, gamespace: Gamespace,...ancestorSourceJson: ISource[]) {
    this.$id = `${gamespace}/Moves/${formatIdFragment(json._idFragment??json.Title.Canonical)}`;
    this.Title = new Title(json.Title, this);
    this.Description = json.Description;
    this.Source = new Source(json.Source, ...ancestorSourceJson);
    this.Display = new Display(json.Display ?? {});
    this.Optional = json.Optional ?? false;
    this.Moves = json.Moves.map(move => {
      move.Category = this.$id;
      return new Move(move, this, gamespace,this.Source, ...ancestorSourceJson);
    });
  }
}