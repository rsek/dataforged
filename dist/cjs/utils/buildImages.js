"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildImages = void 0;
const cloneImages_js_1 = require("./process_img/cloneImages.js");
const convertRasterImages_js_1 = require("./process_img/convertRasterImages.js");
/**
 * Clones raster images and converts them to webp.
 *
 * @param srcRoot - the root directory of source files
 * @param outPng - The destination filepath for png images.
 * @param srcPng - the directory of png files
 * @param outWebP - The destination filepath for webp images.
 */
function buildImages(srcRoot, outPng, srcPng, outWebP) {
    (0, cloneImages_js_1.cloneImages)(srcRoot, outPng);
    (0, convertRasterImages_js_1.convertRasterImages)(srcPng, outWebP);
}
exports.buildImages = buildImages;
//# sourceMappingURL=buildImages.js.map