import { cloneImages } from "@dataforged/utils/process_img/cloneImages.js";
import { convertRasterImages } from "@dataforged/utils/process_img/convertRasterImages.js";

/**
 * Clones raster images and converts them to webp.
 *
 * @param srcRoot - the root directory of source files
 * @param outPng - The destination filepath for png images.
 * @param srcPng - the directory of png files
 * @param outWebP - The destination filepath for webp images.
 */
export function buildImages(srcRoot: string, outPng: string, srcPng: string, outWebP: string) {
  cloneImages(srcRoot, outPng);
  convertRasterImages(srcPng, outWebP);
}