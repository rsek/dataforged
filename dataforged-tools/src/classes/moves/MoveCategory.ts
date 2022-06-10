import { Move , Source } from "@classes/index.js";
import { MoveCategoryDisplay } from "@classes/moves/MoveCategoryDisplay.js";
import type { Gamespace , IMoveCategory, ISource } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IMoveCategoryYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class MoveCategory implements IMoveCategory {
  $id: IMoveCategory["$id"];
  Name: string;
  Source: Source;
  Description: string;
  Moves: Move[];
  Display: MoveCategoryDisplay;
  Optional: boolean;
  constructor(json: IMoveCategoryYaml, gamespace: Gamespace,...ancestorSourceJson: ISource[]) {
    this.$id = `${gamespace}/Moves/${formatIdFragment(json._idFragment??json.Name)}`;
    this.Name = json.Name;
    this.Description = json.Description;
    this.Source = new Source(json.Source, ...ancestorSourceJson);
    this.Display = new MoveCategoryDisplay(`${json.Name} Moves`, this.$id, json.Display?.Color ?? undefined);
    this.Optional = json.Optional ?? false;
    this.Moves = json.Moves.map(move => {
      move.Category = this.$id;
      return new Move(move, this, gamespace,this.Source, ...ancestorSourceJson);
    });
  }
}