import { renderMove } from "./renderMove.js";
import _ from "lodash-es";
export function renderMoveCategory(moveCat, headerLevel = 2, localLinksOnly = true) {
    const header = `${_.repeat("#", headerLevel)} ${moveCat.Display.Title}`;
    const items = [header, moveCat.Description];
    const categories = _.uniq(moveCat.Moves.map(move => move.Category));
    const moveCategoryText = categories.map(category => {
        const moveText = moveCat.Moves.filter(move => move.Category === category).map(move => renderMove(move, headerLevel + 1));
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
//# sourceMappingURL=renderMoveCategory.js.map