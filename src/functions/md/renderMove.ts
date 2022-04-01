import _ from "lodash-es";
import type Move from "../../types/moves/Move.js";

export default function renderMove(move: Move, headerLevel: number = 3): string {
  const header = _.repeat("#", headerLevel) + " " + move.Name;
  const items = [header];
  if (move["Progress Move"]) {
    items.push("*Progress Move*");
  }
  items.push(move.Text);
  return items.join("\n\n");
}

