import cloneImages from "./process-img/cloneImages.js";
import convertRasterImages from "./process-img/convertRasterImages.js";

export default function buildImages(srcRoot: string, outRoot: string, srcPng: string, outWebP: string) {
  cloneImages(srcRoot, outRoot);
  convertRasterImages(srcPng, outWebP);
}