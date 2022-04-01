import _ from "lodash-es";
import renderMove from "./renderMove.js";
import type Move from "../../types/moves/Move.js";
import type MoveCategory from "../../types/moves/MoveCategory";

export default function renderMoves(moveCat: MoveCategory, headerLevel: number = 1, localLinksOnly = true): string {
  const moves = moveCat.Moves;
  const header = _.repeat("#", headerLevel) + " Moves";
  const items = [header];

  const categories = _.uniq(moves.map(move => move.Category));

  const moveCategoryText = categories.map(category => {
    const categoryHeader = _.repeat("#", headerLevel + 1) + " " + category;
    const moveText = moves.filter(move => move.Category === category).map(move => renderMove(move, headerLevel + 2));
    return [ categoryHeader, ...moveText ];
  }).flat(2);

  items.push(...moveCategoryText);

  return items.join("\n\n").replace(/\(Moves#/g, "(#");
}
