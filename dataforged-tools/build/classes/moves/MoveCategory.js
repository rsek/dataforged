import { Move, Source } from "../index.js";
import { MoveCategoryDisplay } from "./MoveCategoryDisplay.js";
import { formatIdFragment } from "../../utils/toIdFragment.js";
/**
 * @internal
 */
export class MoveCategory {
    constructor(json, gamespace, ...ancestorSourceJson) {
        var _a, _b, _c;
        this.$id = `${gamespace}/Moves/${formatIdFragment(json.Name)}`;
        this.Name = json.Name;
        this.Description = json.Description;
        this.Source = new Source(json.Source, ...ancestorSourceJson);
        this.Display = new MoveCategoryDisplay(`${json.Name} Moves`, (_b = (_a = json.Display) === null || _a === void 0 ? void 0 : _a.Color) !== null && _b !== void 0 ? _b : undefined);
        this.Optional = (_c = json.Optional) !== null && _c !== void 0 ? _c : false;
        this.Moves = json.Moves.map(move => {
            move.Category = this.$id;
            return new Move(move, this, gamespace, this.Source, ...ancestorSourceJson);
        });
    }
}
//# sourceMappingURL=MoveCategory.js.map