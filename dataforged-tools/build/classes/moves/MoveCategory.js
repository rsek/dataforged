import { Display, Move, Source, Title } from "../index.js";
import { formatIdFragment } from "../../utils/formatIdFragment.js";
/**
 * @internal
 */
export class MoveCategory {
    constructor(json, gamespace, ...ancestorSourceJson) {
        this.$id = `${gamespace}/Moves/${formatIdFragment(json._idFragment ?? json.Title.Canonical)}`;
        this.Title = new Title(json.Title, this);
        this.Description = json.Description;
        this.Source = new Source(json.Source, ...ancestorSourceJson);
        this.Display = new Display(json.Display ?? {});
        this.Optional = json.Optional ?? false;
        this.Moves = json.Moves.map(move => {
            move.Category = this.$id;
            return new Move(move, this, gamespace, this.Source, ...ancestorSourceJson);
        });
    }
}
//# sourceMappingURL=MoveCategory.js.map