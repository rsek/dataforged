"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveCategory = void 0;
const index_js_1 = require("../index.js");
const MoveCategoryDisplay_js_1 = require("./MoveCategoryDisplay.js");
/**
 * @internal
 */
class MoveCategory {
    constructor(json, gamespace, ...ancestorSourceJson) {
        var _a, _b;
        this.$id = `${gamespace}/Moves/${json.Name.replaceAll(" ", "_")}`;
        this.Name = json.Name;
        this.Description = json.Description;
        this.Source = new index_js_1.Source(json.Source, ...ancestorSourceJson);
        this.Display = new MoveCategoryDisplay_js_1.MoveCategoryDisplay(`${json.Name} Moves`, (_b = (_a = json.Display) === null || _a === void 0 ? void 0 : _a.Color) !== null && _b !== void 0 ? _b : null);
        this.Moves = json.Moves.map(move => {
            move.Category = this.$id;
            return new index_js_1.Move(move, gamespace, this.Source, ...ancestorSourceJson);
        });
    }
}
exports.MoveCategory = MoveCategory;
//# sourceMappingURL=MoveCategory.js.map