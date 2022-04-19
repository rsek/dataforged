"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeYaml = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
/**
 * Write a nicely formatted YAML file from a JSON object
 * @param filePathOut - The path to the file to write.
 * @param jsonObj - The JSON object to be converted to YAML.
 */
function writeYaml(filePathOut, jsonObj) {
    const yamlData = js_yaml_1.default.dump(jsonObj, {
        lineWidth: -1,
        quotingType: "\"",
        // noRefs: true,
    });
    fs_1.default.writeFileSync(filePathOut, yamlData);
}
exports.writeYaml = writeYaml;
//# sourceMappingURL=writeYaml.js.map