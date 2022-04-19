"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveCategoryDisplay = void 0;
const badJsonError_js_1 = require("../../utils/logging/badJsonError.js");
const validateColor_js_1 = require("../../utils/validateColor.js");
/**
 * @internal
 */
class MoveCategoryDisplay {
    constructor(title, color) {
        this.Title = title;
        if (color && !(0, validateColor_js_1.validateColor)(color)) {
            throw (0, badJsonError_js_1.badJsonError)(this.constructor, color, "Not a valid color.");
        }
        this.Color = color !== null && color !== void 0 ? color : undefined;
    }
}
exports.MoveCategoryDisplay = MoveCategoryDisplay;
//# sourceMappingURL=MoveCategoryDisplay.js.map