import { renderMoveCategory } from "./md/renderMoveCategory.js";
import { transformMoveLinks } from "./md/transformHyperlink.js";
import { writeFileSync } from "fs";
export function buildMoveMarkdown(data, mdPath) {
    const allMoveText = [
        "# Starforged Moves",
        data.map(moveCat => renderMoveCategory(moveCat, 2))
    ].flat(2).join("\n\n");
    writeFileSync(mdPath + "moves.md", transformMoveLinks(allMoveText, true) + "\n", { encoding: "utf-8" });
}
//# sourceMappingURL=buildMoveMarkdown.js.map