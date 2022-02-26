
import t from 'ts-runtime/lib';
import buildWithRefs from "./buildWithRefs";
import getYamlFiles from "./getYamlFiles";
import ISource from "../types/general/interfaces/ISource";
import Move from "../types/moves/Move";
import IMove from "../types/moves/interfaces/IMove";
import IYamlWithRef from './IYamlWithRef';
import badJsonError from './badJsonError';
const filesMoves = getYamlFiles().filter(file => file.toString().match("moves.yaml$"));

interface IMovesRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Moves: IMove[];
}

export default function buildMoves() {
  console.info("[buildMoves] Building moves...");
  const movesRoot = buildWithRefs(undefined, ...filesMoves) as IMovesRoot;
  const json = movesRoot.Moves.map((moveData, index, moveDataArray) => {
    moveData.Source = movesRoot.Source;
    if (moveData["Variant of"]) {
      const templateMove = moveDataArray.find(move => move.$id == moveData["Variant of"] || move.Name == moveData["Variant of"]?.replace("Moves / ", ""));
      if (!templateMove) {
        throw badJsonError(buildMoves, moveData, "Unable to find move referenced by template");
      }
      moveData = Object.assign(templateMove, moveData);
    }
    const newMove = new Move(moveData)
    newMove.Source = movesRoot.Source;
    return newMove;
  });
  console.info(`[buildMoves] Finished building ${json.length} moves.`);
  return json;
}


