import cloneImages from "./process-img/cloneImages";
import convertRasterImages from "./process-img/convertRasterImages";

export default function buildImages(srcRoot: string, outRoot: string, srcPng: string, outWebP: string) {
  cloneImages(srcRoot, outRoot);
  convertRasterImages(srcPng, outWebP);
}