"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Recursively gets the path of all YAML files in a directory.
 *
 * @param dirPath - the path to the directory.
 * @param arrayOfFiles - an array of file paths for the function to add paths too (used mainly for recursing)
 * @returns An array of file paths.
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs_1.default.readdirSync(dirPath);
    files.forEach(function (file) {
        if (fs_1.default.statSync(dirPath.toString() + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath.toString() + "/" + file, arrayOfFiles);
        }
        else {
            arrayOfFiles.push(path_1.default.join(
            // use __dirname instead of "./" for absolute paths
            "./", dirPath.toString(), "/", file));
        }
    });
    return arrayOfFiles;
}
exports.getAllFiles = getAllFiles;
//# sourceMappingURL=getAllFiles.js.map