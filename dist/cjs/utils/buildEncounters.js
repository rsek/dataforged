"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEncounters = void 0;
const EncounterNatureInfo_js_1 = require("../classes/encounters/EncounterNatureInfo.js");
const index_js_1 = require("../classes/index.js");
const index_js_2 = require("../constants/index.js");
const Gamespace_js_1 = require("../json_out/common/Gamespace.js");
const encounterStats_js_1 = require("./encounterStats.js");
const badJsonError_js_1 = require("./logging/badJsonError.js");
const buildLog_js_1 = require("./logging/buildLog.js");
const concatWithYamlRefs_js_1 = require("./process_yaml/concatWithYamlRefs.js");
const fast_glob_1 = __importDefault(require("fast-glob"));
/**
 * Assembles encounter data from YAML shorthand into JSON.
 * @returns
 */
function buildEncounters(gamespace) {
    (0, buildLog_js_1.buildLog)(buildEncounters, "Building encounters...");
    const encounterFiles = fast_glob_1.default.sync(`${index_js_2.MASTER_DATA_PATH}/${gamespace}/Encounters*.(yml|yaml)`, { onlyFiles: true });
    console.log(encounterFiles);
    let json;
    const encounterRoot = (0, concatWithYamlRefs_js_1.concatWithYamlRefs)(undefined, ...encounterFiles);
    switch (gamespace) {
        case Gamespace_js_1.Gamespace.Starforged: {
            json = encounterRoot.Encounters.map(enc => new index_js_1.EncounterStarforged(enc, encounterRoot.Source));
            break;
        }
        case Gamespace_js_1.Gamespace.Ironsworn: {
            json = encounterRoot.Encounters.map(enc => new EncounterNatureInfo_js_1.EncounterNatureInfo(enc));
            break;
        }
        default:
            throw (0, badJsonError_js_1.badJsonError)(buildEncounters);
    }
    (0, buildLog_js_1.buildLog)(buildEncounters, `Finished building ${(0, encounterStats_js_1.encounterStats)(gamespace, json)}`);
    return json;
}
exports.buildEncounters = buildEncounters;
//# sourceMappingURL=buildEncounters.js.map