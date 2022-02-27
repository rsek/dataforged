

import _ from "lodash";
import buildMoves from "./buildMoves";
import writeJson from "./io/writeJSON";
import Move from '../types/moves/Move';


const hitPattern = new RegExp(/On a \*\*hit\*\*, (?<content>(.|\n)*?)\./, "m");
const strongHitPattern = new RegExp(/On a \*\*strong hit\*\*, (?<content>(.|\n)*?)On a \*\*weak hit\*\*, /, "m");
const weakHitPattern = new RegExp(/On a \*\*weak hit\*\*, (?<content>(.|\n)*?)On a \*\*miss\*\*/, "m");
const missPattern = new RegExp(/On a \*\*miss\*\*, (?<content>(.|\n)*)/, "m");

const chooseOptionsPattern = new RegExp(/ {2}\* (.*)/, "gmi");


const sortOrder = ["You are", "Take", "Add"];


type outcomeMatch = { content: string; }

export function extractMoveOutcome(move: Move) {
  const newObj = {
    $id: move.$id,
    "Hit": move.Text.match(hitPattern) ? (move.Text.match(hitPattern)?.groups as outcomeMatch).content.trim() : undefined,
    "Strong Hit": move.Text.match(strongHitPattern) ? (move.Text.match(strongHitPattern)?.groups as outcomeMatch).content.trim() : undefined,
    "Weak Hit": move.Text.match(weakHitPattern) ? (move.Text.match(weakHitPattern)?.groups as outcomeMatch).content.trim() : undefined,
    "Miss": move.Text.match(missPattern) ? (move.Text.match(missPattern)?.groups as outcomeMatch).content.trim() : undefined,
  };

  if (newObj["Weak Hit"]?.startsWith("choose")) {
    // console.info(newObj["Weak Hit"]);
    const match = [...newObj["Weak Hit"].matchAll(chooseOptionsPattern)].map(item => item[1]);
    console.info("has options", match);
    const unorderedList = match.map(item => `  * ${item}`).join("\n");
    if (newObj["Strong Hit"]) {
      if (newObj["Strong Hit"].includes("take both")) {
        const sorted = match.sort((a, b) => sortOrder.findIndex(item => item.startsWith(a)) - sortOrder.findIndex(item => item.startsWith(b)));
        newObj["Strong Hit"] = sorted.join(". ");
      }
      else if (newObj["Strong Hit"].includes("choose two")) {
        newObj["Strong Hit"] += "\n\n" + unorderedList;
      }
    }
  }
  if (newObj["Weak Hit"]) {
    if (newObj["Weak Hit"].startsWith("as above")) {
      let weakHitEffect = newObj["Weak Hit"].replace("as above, but", "");

    }
  }



  // alternatively: split at strong hit markers?
  // since we also have the trigger, we can probably remove all lines that include the trigger info.
  // we can also ignore things that don't have a progress roll or an action roll


  // "On a **weak hit**, as above, but" pattern is pretty consistent.
  // "On a **hit**"

  // could just keep looking until the next 'hit' example
  return newObj;
}

const moves = buildMoves();

const newObj = _.keyBy(moves.map(move => extractMoveOutcome(move)), "$id");




writeJson("./moveOutcomes.json", newObj);
