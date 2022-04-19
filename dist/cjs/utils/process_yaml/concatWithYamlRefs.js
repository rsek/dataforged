"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatWithYamlRefs = void 0;
const index_js_1 = require("../../constants/index.js");
const loadYamlRefs_js_1 = require("./loadYamlRefs.js");
const loadYamlTemplates_js_1 = require("./loadYamlTemplates.js");
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
/**
 * Concatenates YAML with reference objects.
 * @param referencePath - The path to the directory containing the reference files.
 * @param filePaths - The files to load.
 * @returns A JavaScript object with the following properties:
 */
function concatWithYamlRefs(referencePath = index_js_1.REFS_PATH, ...filePaths) {
    const refString = (0, loadYamlRefs_js_1.loadYamlRefs)(referencePath);
    const templateString = (0, loadYamlTemplates_js_1.loadYamlTemplates)(referencePath + "/templates/");
    const fileStrings = filePaths.map(path => fs_1.default.readFileSync(path, { encoding: "utf-8" }));
    const dataStrings = [refString, templateString, ...fileStrings];
    const dataObject = js_yaml_1.default.load(dataStrings.join("\n\n"));
    return dataObject;
}
exports.concatWithYamlRefs = concatWithYamlRefs;
//# sourceMappingURL=concatWithYamlRefs.js.map