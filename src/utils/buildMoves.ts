import { MoveCategory } from "@classes/index.js";
import { MASTER_DATA_PATH } from "@constants/index.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { ISource } from "@json_out/index.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import type { IMoveCategoryYaml ,IYamlWithRef } from "@yaml_in/index.js";
import fg from "fast-glob";
import _ from "lodash-es";

interface IMovesRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Categories: IMoveCategoryYaml[]
  // Moves: IMove[];
}
/**
 * It takes the data from the YAML files, and then it iterates over the categories, and then it
 * iterates over the moves in each category, and then it creates a MoveCategory object for each
 * category, and then it returns an array of all of those MoveCategory objects
 * @returns An array of MoveCategory objects.
 */
export function buildMoves(gamespace: Gamespace = "Starforged") {
  buildLog(buildMoves, "Building moves...");

  // const moveFiles = getYamlFiles(`${MASTER_YAML_PATH as string}/${gamespace}`).filter(file => file.toString().match(/^Moves.*\.ya?ml$/));

  const moveFiles = fg.sync(`${MASTER_DATA_PATH as string}/${gamespace}/Moves*.(yml|yaml)`, { onlyFiles: true });

  const movesRoot = concatWithYamlRefs(undefined, ...moveFiles) as IMovesRoot;

  const json = movesRoot.Categories.map((moveCatData, index, moveCatDataArray) => {
    moveCatData.Moves.map((moveData, index, movesInCat) => {
      moveData.Source = movesRoot.Source;
      // if (moveData["Variant of"]) {
      //   const templateMove = movesInCat.flatMap().find(move => move.$id === moveData["Variant of"] || move.Name === moveData["Variant of"]?.replaceAll("Moves/", ""));
      //   if (!templateMove) {
      //     throw badJsonError(buildMoves, moveData, "Unable to find move referenced by template");
      //   }
      //   moveData = Object.assign(templateMove, moveData);
      // }
      return moveData;
    }
    );
    return new MoveCategory(moveCatData, gamespace, movesRoot.Source);
  });

  buildLog(buildMoves, `Finished building ${json.length} move categories containing ${_.sum(json.map(moveCat => moveCat.Moves.length))} moves.`);
  return json;
}
