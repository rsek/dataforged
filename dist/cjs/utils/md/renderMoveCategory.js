"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMoveCategory = void 0;
const renderMove_js_1 = require("./renderMove.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * It takes a MoveCategory and returns a string that is a markdown list of all the moves in that
 * category
 * @param moveCat - The MoveCategory to render.
 * @param headerLevel - The level of the top-level header.
 * @param localLinksOnly - FIXME: NYI. If true, only links to moves in the same category will be generated.
 * @returns A string.
 */
function renderMoveCategory(moveCat, headerLevel = 2, localLinksOnly = true) {
    const header = `${lodash_es_1.default.repeat("#", headerLevel)} ${moveCat.Display.Title}`;
    const items = [header, moveCat.Description];
    const categories = lodash_es_1.default.uniq(moveCat.Moves.map(move => move.Category));
    const moveCategoryText = categories.map(category => {
        const moveText = moveCat.Moves.filter(move => move.Category === category).map(move => (0, renderMove_js_1.renderMove)(move, headerLevel + 1));
        return moveText;
    }).flat(2);
    items.push(...moveCategoryText);
    let result = items.join("\n\n");
    if (moveCat.Name !== "Suffer") {
        result = result.replaceAll(/(suffer moves?)/g, "[$1](#Suffer-Moves)");
    }
    if (moveCat.Name !== "Recover") {
        result = result.replaceAll(/(recover moves?)/g, "[$1](#Recover-Moves)");
    }
    return result;
}
exports.renderMoveCategory = renderMoveCategory;
//# sourceMappingURL=renderMoveCategory.js.map