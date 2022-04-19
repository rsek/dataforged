"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadYamlTemplates = void 0;
const index_js_1 = require("../../constants/index.js");
const fs_1 = __importDefault(require("fs"));
/**
 * It loads all the yaml files in the templates directory and joins them into a single string.
 * @param path - The path to the directory containing the YAML files.
 * @returns A string of YAML that can be parsed by the `yaml` module.
 */
function loadYamlTemplates(path = index_js_1.REFS_PATH.toString() + "/templates/") {
    const files = fs_1.default.readdirSync(path).filter(item => item.match(".yaml"))
        .map(item => path.toString() + item);
    let templateString = files.map(file => fs_1.default.readFileSync(file, { encoding: "utf-8" })).join("\n");
    templateString = templateString.replaceAll(/^/gim, "  ");
    templateString = "_templates:\n" + templateString;
    return templateString;
}
exports.loadYamlTemplates = loadYamlTemplates;
//# sourceMappingURL=loadYamlTemplates.js.map