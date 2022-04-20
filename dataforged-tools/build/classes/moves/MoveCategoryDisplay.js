import { badJsonError } from "../../utils/logging/badJsonError.js";
import { validateColor } from "../../utils/validateColor.js";
/**
 * @internal
 */
export class MoveCategoryDisplay {
    constructor(title, color) {
        this.Title = title;
        if (color && !validateColor(color)) {
            throw badJsonError(this.constructor, color, "Not a valid color.");
        }
        this.Color = color !== null && color !== void 0 ? color : undefined;
    }
}
//# sourceMappingURL=MoveCategoryDisplay.js.map