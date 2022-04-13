import { Move , Source } from "@classes/index.js";
import { MoveCategoryDisplay } from "@classes/moves/MoveCategoryDisplay.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { ISource, MoveCategoryId, MoveCategoryName } from "@json_out/index.js";
import type { IMoveCategory } from "@json_out/moves/IMoveCategory.js";
import type { IMoveCategoryYaml } from "@yaml_in/moves/IMoveCategoryYaml.js";


export class MoveCategory implements IMoveCategory {
  $id: MoveCategoryId;
  Name: MoveCategoryName;
  Source: Source;
  Description: string;
  Moves: Move[];
  Display: MoveCategoryDisplay;
  constructor(json: IMoveCategoryYaml, gamespace: Gamespace,...ancestorSourceJson: ISource[]) {
    this.$id = `${gamespace}/Moves/${json.Name.replaceAll(" ", "_") as MoveCategoryName}`;
    this.Name = json.Name;
    this.Description = json.Description;
    this.Source = new Source(json.Source, ...ancestorSourceJson);
    this.Display = new MoveCategoryDisplay(`${json.Name} Moves`, json.Display.Color);
    this.Moves = json.Moves.map(move => {
      move.Category = this.$id;
      return new Move(move, gamespace,this.Source, ...ancestorSourceJson);
    });
  }
}