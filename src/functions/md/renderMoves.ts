import _ from "lodash";
import Move from "../../types/moves/Move";
import renderMove from "./renderMove";


export default function renderMoves(moves: Move[], headerLevel: number = 1, stripExternalLinks = true): string {
  const header = _.repeat("#", headerLevel) + " Moves";
  const items = [header];

  let categories = _.uniq(moves.map(move => move.Category));

  let moveCategoryText = categories.map(category => {
    let categoryHeader = _.repeat("#", headerLevel + 1) + " " + category;
    let moveText = moves.filter(move => move.Category == category).map(move => renderMove(move, headerLevel + 2));
    return [categoryHeader, ...moveText];
  }).flat(2);

  items.push(...moveCategoryText);

  return items.join("\n\n").replace(/\(Moves#/, "(");
}
