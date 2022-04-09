import _ from "lodash-es";
export function renderMove(move, headerLevel = 3) {
    const header = _.repeat("#", headerLevel) + " " + move.Display.Title;
    const items = [header];
    if (move["Progress Move"]) {
        items.push("*Progress Move*");
    }
    items.push(move.Text);
    return items.join("\n\n");
}
//# sourceMappingURL=renderMove.js.map