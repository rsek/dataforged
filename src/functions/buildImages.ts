import cloneImages from "./process-img/cloneImages.js";
import convertRasterImages from "./process-img/convertRasterImages.js";

/**
 * Clones raster images and converts them to webp.
 * @date 4/5/2022 - 1:49:07 AM
 *
 * @export
 * @param {string} srcRoot
 * @param {string} outRoot
 * @param {string} srcPng
 * @param {string} outWebP
 */
export default function buildImages(srcRoot: string, outRoot: string, srcPng: string, outWebP: string) {
  cloneImages(srcRoot, outRoot);
  convertRasterImages(srcPng, outWebP);
}