/* eslint-disable require-jsdoc */


import _ from "lodash-es";
import getYamlFiles from "./io/getYamlFiles.js";
import type IYamlWithRef from "./IYamlWithRef.js";
import buildLog from "./logging/buildLog.js";
import concatWithYamlRefs from "./process-yaml/concatWithYamlRefs.js";
import type ISource from "../types/general/interfaces/ISource.js";
import type IMoveCategoryYaml from "../types/moves/interfaces/IMoveCategoryYaml.js";
import MoveCategory from "../types/moves/MoveCategory.js";
const filesMoves = getYamlFiles().filter(file => file.toString().match("moves.yaml$"));

interface IMovesRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Categories: IMoveCategoryYaml[]
  // Moves: IMove[];
}

export default function buildMoves() {
  buildLog(buildMoves, "Building moves...");
  const movesRoot = concatWithYamlRefs(undefined, ...filesMoves) as IMovesRoot;

  const json = movesRoot.Categories.map((moveCatData, index, moveCatDataArray) => {
    moveCatData.Moves.map((moveData, index, movesInCat) => {
      moveData.Source = movesRoot.Source;
      // if (moveData["Variant of"]) {
      //   const templateMove = movesInCat.flatMap().find(move => move.$id === moveData["Variant of"] || move.Name === moveData["Variant of"]?.replace("Moves / ", ""));
      //   if (!templateMove) {
      //     throw badJsonError(buildMoves, moveData, "Unable to find move referenced by template");
      //   }
      //   moveData = Object.assign(templateMove, moveData);
      // }
      return moveData;
    }
    );
    return new MoveCategory(moveCatData, movesRoot.Source);
  });

  buildLog(buildMoves, `Finished building ${json.length} move categories containing ${_.sum(json.map(moveCat => moveCat.Moves.length))} moves.`);
  return json;
}

console.log(buildMoves());