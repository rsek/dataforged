"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMoves = void 0;
const index_js_1 = require("../classes/index.js");
const index_js_2 = require("../constants/index.js");
const Gamespace_js_1 = require("../json_out/common/Gamespace.js");
const buildLog_js_1 = require("./logging/buildLog.js");
const concatWithYamlRefs_js_1 = require("./process_yaml/concatWithYamlRefs.js");
const sortIronsworn_js_1 = require("./sortIronsworn.js");
const fast_glob_1 = __importDefault(require("fast-glob"));
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * It takes the data from the YAML files, and then it iterates over the categories, and then it
 * iterates over the moves in each category, and then it creates a MoveCategory object for each
 * category, and then it returns an array of all of those MoveCategory objects
 * @returns An array of MoveCategory objects.
 */
function buildMoves(gamespace = Gamespace_js_1.Gamespace.Starforged) {
    (0, buildLog_js_1.buildLog)(buildMoves, "Building moves...");
    const moveFiles = fast_glob_1.default.sync(`${index_js_2.MASTER_DATA_PATH}/${gamespace}/Moves*.(yml|yaml)`, { onlyFiles: true });
    const moveRoots = moveFiles
        .map(moveFile => (0, concatWithYamlRefs_js_1.concatWithYamlRefs)(index_js_2.REFS_PATH, moveFile));
    const json = [];
    // merges categories that are spread across multiple files
    // e.g. Moves + Moves-Delve
    moveRoots.forEach(root => {
        root.Categories
            .forEach((moveCatData) => {
            const moveCat = new index_js_1.MoveCategory(moveCatData, gamespace, root.Source);
            const targetIndex = json.findIndex(item => item.Name === moveCat.Name);
            if (targetIndex === -1) {
                json.push(moveCat);
            }
            else {
                (0, buildLog_js_1.buildLog)(buildMoves, `A category named "${moveCat.Name}" exists, merging...`);
                json[targetIndex].Moves = json[targetIndex].Moves.concat(...moveCat.Moves).sort((a, b) => (0, sortIronsworn_js_1.sortIronsworn)(a.Source, b.Source));
            }
        });
    });
    //   mv.Categories = mv.Categories.map((moveCatData) => {
    //     moveCatData.Moves.map((moveData, index, movesInCat) => {
    //       moveData.Source = movesRoot.Source;
    //       return moveData;
    //     });
    //     return moveCatData;
    //   });
    //   return new MoveCategory(moveCatData, gamespace, movesRoot.Source);
    // });
    (0, buildLog_js_1.buildLog)(buildMoves, `Finished building ${json.length} move categories containing ${lodash_es_1.default.sum(json.map(moveCat => moveCat.Moves.length))} moves.`);
    return json.sort((a, b) => (0, sortIronsworn_js_1.sortIronsworn)(a.Source, b.Source));
}
exports.buildMoves = buildMoves;
//# sourceMappingURL=buildMoves.js.map