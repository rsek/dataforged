"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToYaml = void 0;
// import yaml from "js-yaml";
const fs_extra_1 = __importDefault(require("fs-extra"));
const yaml_1 = __importDefault(require("yaml"));
// type JsonSerializable = Record<string,unknown> | Record<string,unknown>[];
/**
 * Converts a json object to a YAML file with standardized formatting.
 */
function jsonToYaml(pathIn, pathOut) {
    const data = yaml_1.default.stringify(fs_extra_1.default.readJsonSync(pathIn), {
        indent: 2,
        blockQuote: false,
        doubleQuotedMinMultiLineLength: 40,
    });
    fs_extra_1.default.writeFileSync(pathOut, data);
}
exports.jsonToYaml = jsonToYaml;
jsonToYaml("./src/_master-data/Ironsworn/Truths.json", "./src/_master-data/Ironsworn/Truths.yaml");
//# sourceMappingURL=jsonToYaml.js.map