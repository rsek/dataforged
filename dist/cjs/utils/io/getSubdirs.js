"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubdirs = void 0;
const fs_1 = __importDefault(require("fs"));
const basePath = "./src/data";
/**
 * It returns an array of all the subdirectories of the given directory.
 * @param dir - The directory to search in.
 * @param root - The root directory of the project.
 * @returns An array of paths.
 */
function getSubdirs(dir = "", root = basePath) {
    const path = dir.length ? root + "/" + dir : root;
    const result = fs_1.default
        .readdirSync(path)
        .filter(dir => !dir.startsWith("_") && !dir.includes("."))
        .map(str => (path + "/" + str));
    return result;
}
exports.getSubdirs = getSubdirs;
//# sourceMappingURL=getSubdirs.js.map