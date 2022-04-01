

import getYamlFiles from "./io/getYamlFiles.js";
import type IYamlWithRef from "./IYamlWithRef.js";
import badJsonError from "./logging/badJsonError.js";
import buildLog from "./logging/buildLog.js";
import concatWithYamlRefs from "./process-yaml/concatWithYamlRefs.js";
import type ISource from "../types/general/interfaces/ISource.js";
import type IMove from "../types/moves/interfaces/IMove.js";
import Move from "../types/moves/Move.js";
const filesMoves = getYamlFiles().filter(file => file.toString().match("moves.yaml$"));

interface IMovesRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Moves: IMove[];
}

export default function buildMoves() {
  buildLog(buildMoves, "Building moves...");
  const movesRoot = concatWithYamlRefs(undefined, ...filesMoves) as IMovesRoot;
  const json = movesRoot.Moves.map((moveData, index, moveDataArray) => {
    moveData.Source = movesRoot.Source;
    if (moveData["Variant of"]) {
      const templateMove = moveDataArray.find(move => move.$id === moveData["Variant of"] || move.Name === moveData["Variant of"]?.replace("Moves / ", ""));
      if (!templateMove) {
        throw badJsonError(buildMoves, moveData, "Unable to find move referenced by template");
      }
      moveData = Object.assign(templateMove, moveData);
    }
    const newMove = new Move(moveData);
    newMove.Source = movesRoot.Source;
    return newMove;
  });
  buildLog(buildMoves, `Finished building ${json.length} moves.`);
  return json;
}

