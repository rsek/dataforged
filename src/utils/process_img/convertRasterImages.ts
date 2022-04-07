import getAllFiles from "@dataforged/utils/io/getAllFiles.js";
import pkg from "fs-extra";
const { ensureDirSync, readFileSync } = pkg;
import sharp from "sharp";
import { TypedRegEx } from "typed-regex";

// eslint-disable-next-line no-useless-escape
const filePattern = TypedRegEx("^(?<path>.+)/(?<name>[A-z\-0-9]+)\.(?<extension>.+?)$");

/**
 * For each file in the srcRoot directory, convert it to a webp file in the outRootWebP directory
 * @param srcRoot - The root directory of the source images.
 * @param outRootWebP - The output directory for the webp images.
 */
export default function convertRasterImages(srcRoot: string, outRootWebP: string) {
  const srcFiles = getAllFiles(srcRoot);
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
    const newPath = oldPath.replace(srcRoot, outRootWebP);
    const filePathOut = `${newPath}/${oldFileName}.webp`;
    // console.log("out:", filePathOut);
    ensureDirSync(newPath);
    void sharp(input).webp()
      .toFile(filePathOut);
    // console.log("finished:", filePathOut);
  });
  // console.log("finished converting raster images");
}
