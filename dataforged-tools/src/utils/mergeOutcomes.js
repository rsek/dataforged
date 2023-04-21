
import { readFileSync, writeFileSync } from "fs";
import _ from "lodash";
import yaml from "js-yaml";

let moveData = JSON.parse(readFileSync("./src/data/moves.json"));
let outcomes = JSON.parse(readFileSync("./src/data/moveOutcomes-edit.json"));

moveData.Moves = moveData.Moves.map(move => {
  let outcome = outcomes[`Moves / ${move.Name}`];
  if (outcome) {
    move.Outcomes = {};
    _.forEach(outcome, (value, key) => {
      move.Outcomes[key] = {
        Text: value
      }
    });
  }
  return move;
});

const yamlData = yaml.dump(moveData, {
  lineWidth: -1,
  quotingType: "\""
});
writeFileSync("./src/data/moves-with-outcomes.yaml", yamlData);
