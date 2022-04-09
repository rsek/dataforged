import { MoveCategory } from "../classes/index.js";
import { getYamlFiles } from "./io/getYamlFiles.js";
import { buildLog } from "./logging/buildLog.js";
import { concatWithYamlRefs } from "./process_yaml/concatWithYamlRefs.js";
import _ from "lodash-es";
const filesMoves = getYamlFiles().filter(file => file.toString().match("moves.yaml$"));
export function buildMoves() {
    buildLog(buildMoves, "Building moves...");
    const movesRoot = concatWithYamlRefs(undefined, ...filesMoves);
    const json = movesRoot.Categories.map((moveCatData, index, moveCatDataArray) => {
        moveCatData.Moves.map((moveData, index, movesInCat) => {
            moveData.Source = movesRoot.Source;
            return moveData;
        });
        return new MoveCategory(moveCatData, movesRoot.Source);
    });
    buildLog(buildMoves, `Finished building ${json.length} move categories containing ${_.sum(json.map(moveCat => moveCat.Moves.length))} moves.`);
    return json;
}
//# sourceMappingURL=buildMoves.js.map