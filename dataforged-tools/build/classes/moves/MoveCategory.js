import { Move, Source } from "../index.js";
import { MoveCategoryDisplay } from "./MoveCategoryDisplay.js";
import { formatIdFragment } from "../../utils/toIdFragment.js";
/**
 * @internal
 */
export class MoveCategory {
    constructor(json, gamespace, ...ancestorSourceJson) {
        this.$id = `${gamespace}/Moves/${formatIdFragment(json._idFragment ?? json.Name)}`;
        this.Name = json.Name;
        this.Description = json.Description;
        this.Source = new Source(json.Source, ...ancestorSourceJson);
        this.Display = new MoveCategoryDisplay(`${json.Name} Moves`, json.Display?.Color ?? undefined);
        this.Optional = json.Optional ?? false;
        this.Moves = json.Moves.map(move => {
            move.Category = this.$id;
            return new Move(move, this, gamespace, this.Source, ...ancestorSourceJson);
        });
    }
}
//# sourceMappingURL=MoveCategory.js.map