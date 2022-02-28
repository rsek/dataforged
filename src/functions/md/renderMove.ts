import _ from "lodash";
import Move from "../../types/moves/Move";

export default function renderMove(move: Move, headerLevel: number = 3): string {
  const header = _.repeat("#", headerLevel) + " " + move.Name;
  const items = [header];
  if (move["Progress Move"]) {
    items.push("*Progress Move*");
  }
  items.push(move.Text);
  return items.join("\n\n")
}

