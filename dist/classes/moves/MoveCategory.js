import { Move, Source } from "../index.js";
import { MoveCategoryDisplay } from "./MoveCategoryDisplay.js";
export class MoveCategory {
    constructor(json, gamespace, ...ancestorSourceJson) {
        this.$id = `${gamespace}/Moves/${json.Name.replaceAll(" ", "_")}`;
        this.Name = json.Name;
        this.Description = json.Description;
        this.Source = new Source(json.Source, ...ancestorSourceJson);
        this.Display = new MoveCategoryDisplay(`${json.Name} Moves`, json.Display.Color);
        this.Moves = json.Moves.map(move => {
            move.Category = this.$id;
            return new Move(move, gamespace, this.Source, ...ancestorSourceJson);
        });
    }
}
//# sourceMappingURL=MoveCategory.js.map