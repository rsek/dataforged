"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYamlFiles = void 0;
const fs_1 = __importDefault(require("fs"));
/**
 * It returns an array of all the yaml filepaths in the directory.
 * @returns An array of file paths.
 */
function getYamlFiles(dir) {
    return fs_1.default
        .readdirSync(dir)
        .filter(file => !file.startsWith("_") && !file.startsWith(".") && file.match(/.*\.yaml/))
        .map(str => (`${dir.toString()}/${str}`));
}
exports.getYamlFiles = getYamlFiles;
//# sourceMappingURL=getYamlFiles.js.map