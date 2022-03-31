import _ from "lodash-es";
import Move from "../../types/moves/Move";
import renderMove from "./renderMove";


export default function renderMoves(moves: Move[], headerLevel: number = 1, localLinksOnly = true): string {
  const header = _.repeat("#", headerLevel) + " Moves";
  const items = [header];

  const categories = _.uniq(moves.map(move => move.Category));

  const moveCategoryText = categories.map(category => {
    const categoryHeader = _.repeat("#", headerLevel + 1) + " " + category;
    const moveText = moves.filter(move => move.Category == category).map(move => renderMove(move, headerLevel + 2));
    return [categoryHeader, ...moveText];
  }).flat(2);

  items.push(...moveCategoryText);

  return items.join("\n\n").replace(/\(Moves#/g, "(#");
}
