//License: MIT
import { cloneImages } from "./process_img/cloneImages.js";
import { convertRasterImages } from "./process_img/convertRasterImages.js";
/**
 * Clones raster images and converts them to webp.
 *
 * @param srcRoot - the root directory of source files
 * @param outPng - The destination filepath for png images.
 * @param srcPng - the directory of png files
 * @param outWebP - The destination filepath for webp images.
 */
export function buildImages(srcRoot, outPng, srcPng, outWebP) {
    cloneImages(srcRoot, outPng);
    convertRasterImages(srcPng, outWebP);
}
//# sourceMappingURL=buildImages.js.map