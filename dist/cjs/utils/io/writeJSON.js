"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJson = void 0;
const prettier_1 = __importDefault(require("prettier"));
const fs_1 = __importDefault(require("fs"));
/**
 * Writes a JSON object to a nicely formatted file.
 *
 */
function writeJson(filePathOut, jsonObj, minified = false) {
    let parser = "json";
    let jsonData = JSON.stringify(jsonObj);
    if (minified === true) {
        parser = "json-stringify";
    }
    jsonData = prettier_1.default.format(jsonData, { parser });
    return fs_1.default.writeFileSync(filePathOut, jsonData);
}
exports.writeJson = writeJson;
//# sourceMappingURL=writeJSON.js.map