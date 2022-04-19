"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMove = void 0;
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * It renders a move.
 * @param move - The move object to render.
 * @param headerLevel - The header level to use for the move.
 * @returns A string.
 */
function renderMove(move, headerLevel = 3) {
    const header = lodash_es_1.default.repeat("#", headerLevel) + " " + move.Display.Title;
    const items = [header];
    if (move["Progress Move"]) {
        items.push("*Progress Move*");
    }
    items.push(move.Text);
    return items.join("\n\n");
}
exports.renderMove = renderMove;
//# sourceMappingURL=renderMove.js.map