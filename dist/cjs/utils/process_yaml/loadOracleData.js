"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOracleData = void 0;
const index_js_1 = require("../../constants/index.js");
const concatWithYamlRefs_js_1 = require("./concatWithYamlRefs.js");
const deep_freeze_strict_1 = __importDefault(require("deep-freeze-strict"));
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * Loads the oracle YAML data from the files and merges them into a single object.
 * @param referencePath - The path to the YAML file containing the references..
 * @param filePaths - The files to load.
 * @returns A JSON object with the following structure:
 */
function loadOracleData(referencePath = index_js_1.REFS_PATH, ...filePaths) {
    const builtData = (0, concatWithYamlRefs_js_1.concatWithYamlRefs)(referencePath, ...filePaths);
    const result = {
        _refs: (0, deep_freeze_strict_1.default)(builtData._refs),
        _templates: (0, deep_freeze_strict_1.default)(builtData._templates),
        Categories: Object.values(lodash_es_1.default.omitBy(builtData, (_, key) => key.startsWith("_"))),
    };
    return result;
}
exports.loadOracleData = loadOracleData;
//# sourceMappingURL=loadOracleData.js.map