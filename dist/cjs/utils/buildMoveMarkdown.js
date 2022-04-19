"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMoveMarkdown = void 0;
const renderMoveCategory_js_1 = require("./md/renderMoveCategory.js");
const transformHyperlink_js_1 = require("./md/transformHyperlink.js");
const fs_1 = require("fs");
/**
 * It takes in a list of move categories, and writes a markdown file with all of the move categories and their moves.
 * @param data - MoveCategory[]
 * @param mdPath - The path to the directory where the markdown files are stored.
 */
function buildMoveMarkdown(data, mdPath) {
    const allMoveText = [
        "# Starforged Moves",
        data.map(moveCat => (0, renderMoveCategory_js_1.renderMoveCategory)(moveCat, 2))
    ].flat(2).join("\n\n");
    (0, fs_1.writeFileSync)(`${mdPath}/moves.md`, (0, transformHyperlink_js_1.transformMoveLinks)(allMoveText, true) + "\n", { encoding: "utf-8" });
}
exports.buildMoveMarkdown = buildMoveMarkdown;
//# sourceMappingURL=buildMoveMarkdown.js.map