import { badJsonError } from "../../utils/logging/badJsonError.js";
import { validateColor } from "../../utils/validateColor.js";
/**
 * @internal
 * @deprecated Will be replaced with a class for displays that include a colour reference
 */
export class MoveCategoryDisplay {
    constructor(title, color) {
        this.Title = title;
        if (color && !validateColor(color)) {
            throw badJsonError(this.constructor, color, "Not a valid color.");
        }
        this.Color = color ?? undefined;
    }
}
//# sourceMappingURL=MoveCategoryDisplay.js.map