"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRasterImages = void 0;
const getAllFiles_js_1 = require("../io/getAllFiles.js");
const fs_extra_1 = __importDefault(require("fs-extra"));
const { ensureDirSync, readFileSync } = fs_extra_1.default;
const sharp_1 = __importDefault(require("sharp"));
const typed_regex_1 = require("typed-regex");
// eslint-disable-next-line no-useless-escape
const filePattern = (0, typed_regex_1.TypedRegEx)("^(?<path>.+)/(?<name>[A-z\-0-9]+)\.(?<extension>.+?)$");
/**
 * For each file in the srcRoot directory, convert it to a webp file in the outRootWebP directory
 * @param srcRoot - The root directory of the source images.
 * @param outRootWebP - The output directory for the webp images.
 */
function convertRasterImages(srcRoot, outRootWebP) {
    const srcFiles = (0, getAllFiles_js_1.getAllFiles)(srcRoot);
    srcFiles.forEach(file => {
        // console.log("in:", file);
        const pattern = filePattern.captures(file);
        if (!pattern) {
            throw new Error(`Unable to match against pattern ${filePattern.toString()} ${file}`);
        }
        const input = readFileSync(file);
        const oldFileName = pattern.name;
        const oldPath = pattern.path;
        // console.log(`[convertRasterImages] Converting ${oldFileName }`);
        const newPath = oldPath.replaceAll(srcRoot, outRootWebP);
        const filePathOut = `${newPath}/${oldFileName}.webp`;
        // console.log("out:", filePathOut);
        ensureDirSync(newPath);
        void (0, sharp_1.default)(input).webp()
            .toFile(filePathOut);
        // console.log("finished:", filePathOut);
    });
    // console.log("finished converting raster images");
}
exports.convertRasterImages = convertRasterImages;
//# sourceMappingURL=convertRasterImages.js.map