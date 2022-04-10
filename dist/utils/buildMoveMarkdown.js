import { renderMoveCategory } from "./md/renderMoveCategory.js";
import { transformMoveLinks } from "./md/transformHyperlink.js";
import { writeFileSync } from "fs";
/**
 * It takes in a list of move categories, and writes a markdown file with all of the move categories and their moves.
 * @param data - MoveCategory[]
 * @param mdPath - The path to the directory where the markdown files are stored.
 */
export function buildMoveMarkdown(data, mdPath) {
    const allMoveText = [
        "# Starforged Moves",
        data.map(moveCat => renderMoveCategory(moveCat, 2))
    ].flat(2).join("\n\n");
    writeFileSync(mdPath + "moves.md", transformMoveLinks(allMoveText, true) + "\n", { encoding: "utf-8" });
}
//# sourceMappingURL=buildMoveMarkdown.js.map