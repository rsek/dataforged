import type { MoveCategory } from "@schema";
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
export function renderMoveCategory(moveCat: MoveCategory, headerLevel: number = 2, localLinksOnly = true): string {
  const header = `${_.repeat("#", headerLevel)} ${moveCat.Title.Canonical}`;
  const items = [ header, moveCat.Description ];

  const categories = _.mapValues(moveCat.Moves, move => move.Category);

  const moveCategoryText = _.flatMap(categories,category => {
    const moveText = _.filter(moveCat.Moves,move => move.Category === category).map(move => renderMove(move, headerLevel + 1));
    return moveText;
  })

  items.push(...moveCategoryText);

  let result =  items.join("\n\n");

  if (moveCat.Title.Canonical !== "Suffer Moves") {
    result = result.replaceAll(/(suffer moves?)/g, "[$1](#Suffer-Moves)");
  }
  if (moveCat.Title.Canonical !== "Recover Moves") {
    result = result.replaceAll(/(recover moves?)/g, "[$1](#Recover-Moves)");
  }

  return result;
}