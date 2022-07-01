//License: MIT
import type { IMoveCategory } from "@json_out/index.js";
import { renderMove } from "@utils/md/renderMove.js";
import _ from "lodash-es";

/**
 * It takes a MoveCategory and returns a string that is a markdown list of all the moves in that
 * category
 * @param moveCat - The MoveCategory to render.
 * @param headerLevel - The level of the top-level header.
 * @param localLinksOnly - FIXME: NYI. If true, only links to moves in the same category will be generated.
 * @returns A string.
 */
export function renderMoveCategory(moveCat: IMoveCategory, headerLevel: number = 2, localLinksOnly = true): string {
  const header = `${_.repeat("#", headerLevel)} ${moveCat.Display.Title}`;
  const items = [ header, moveCat.Description ];

  const categories = _.uniq(moveCat.Moves.map(move => move.Category));

  const moveCategoryText = categories.map(category => {
    const moveText = moveCat.Moves.filter(move => move.Category === category).map(move => renderMove(move, headerLevel + 1));
    return moveText;
  }).flat(2);

  items.push(...moveCategoryText);

  let result =  items.join("\n\n");

  if (moveCat.Name !== "Suffer") {
    result = result.replaceAll(/(suffer moves?)/g, "[$1](#Suffer-Moves)");
  }
  if (moveCat.Name !== "Recover") {
    result = result.replaceAll(/(recover moves?)/g, "[$1](#Recover-Moves)");
  }

  return result;
}