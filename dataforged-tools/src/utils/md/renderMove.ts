//License: MIT
import type { IMove } from "@json_out/index.js";
import _ from "lodash-es";

/**
 * It renders a move.
 * @param move - The move object to render.
 * @param headerLevel - The header level to use for the move.
 * @returns A string.
 */
export function renderMove(move: IMove, headerLevel: number = 3): string {
  const header = _.repeat("#", headerLevel) + " " + move.Display.Title;
  const items = [header];
  if (move["Progress Move"]) {
    items.push("*Progress Move*");
  }
  items.push(move.Text);
  return items.join("\n\n");
}

