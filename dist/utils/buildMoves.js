import { MoveCategory } from "../classes/index.js";
import { getYamlFiles } from "./io/getYamlFiles.js";
import { buildLog } from "./logging/buildLog.js";
import { concatWithYamlRefs } from "./process_yaml/concatWithYamlRefs.js";
import _ from "lodash-es";
const filesMoves = getYamlFiles().filter(file => file.toString().match("moves.yaml$"));
/**
 * It takes the data from the YAML files, and then it iterates over the categories, and then it
 * iterates over the moves in each category, and then it creates a MoveCategory object for each
 * category, and then it returns an array of all of those MoveCategory objects
 * @returns An array of MoveCategory objects.
 */
export function buildMoves() {
    buildLog(buildMoves, "Building moves...");
    const movesRoot = concatWithYamlRefs(undefined, ...filesMoves);
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
        });
        return new MoveCategory(moveCatData, movesRoot.Source);
    });
    buildLog(buildMoves, `Finished building ${json.length} move categories containing ${_.sum(json.map(moveCat => moveCat.Moves.length))} moves.`);
    return json;
}
//# sourceMappingURL=buildMoves.js.map