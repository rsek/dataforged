import { Source } from "../../../dist/classes/common/Source.js";
import { Move } from "../../../dist/classes/moves/Move.js";
import { badJsonError } from "../../../dist/utils/logging/badJsonError.js";
import { validateColor } from "../../../dist/utils/validateColor.js";
export class MoveCategoryDisplay {
    constructor(title, color) {
        this.Title = title;
        if (!validateColor(color)) {
            throw badJsonError(this.constructor, color, "Not a valid color.");
        }
        this.Color = color;
    }
}
export class MoveCategory {
    constructor(json, ...ancestorSourceJson) {
        this.$id = `Moves / ${json.Name}`;
        this.Name = json.Name;
        this.Description = json.Description;
        this.Source = new Source(json.Source, ...ancestorSourceJson);
        this.Display = new MoveCategoryDisplay(`${json.Name} Moves`, json.Display.Color);
        this.Moves = json.Moves.map(move => {
            move.Category = this.$id;
            return new Move(move, this.Source, ...ancestorSourceJson);
        });
    }
}
//# sourceMappingURL=MoveCategory.js.map