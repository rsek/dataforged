import { badJsonError } from "../../utils/logging/badJsonError.js";
import { validateColor } from "../../utils/validateColor.js";
/**
 * @internal
 */
export class MoveCategoryDisplay {
    constructor(title, color) {
        this.Title = title;
        if (!validateColor(color)) {
            throw badJsonError(this.constructor, color, "Not a valid color.");
        }
        this.Color = color;
    }
}
//# sourceMappingURL=MoveCategoryDisplay.js.map