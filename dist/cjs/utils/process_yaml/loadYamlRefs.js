"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadYamlRefs = void 0;
const index_js_1 = require("../../constants/index.js");
const fast_glob_1 = __importDefault(require("fast-glob"));
const fs_1 = __importDefault(require("fs"));
/**
 * It loads all the yaml files in the refs folder and joins them into a single string.
 * @param path - The path to the directory containing the YAML files.
 * @returns A string of YAML that is the concatenation of the contents of the files in the `index`
 * directory.
 */
function loadYamlRefs(path = index_js_1.REFS_PATH) {
    const files = fast_glob_1.default.sync(path + "/*.(yml|yaml)", { onlyFiles: true });
    let refString = files.map(file => fs_1.default.readFileSync(file, { encoding: "utf-8" })).join("\n");
    refString = refString.replaceAll(/^/gim, "  ");
    refString = "_refs:\n" + refString;
    return refString;
}
exports.loadYamlRefs = loadYamlRefs;
//# sourceMappingURL=loadYamlRefs.js.map