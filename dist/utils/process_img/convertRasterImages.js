import { getAllFiles } from "../../../dist/utils/io/getAllFiles.js";
import pkg from "fs-extra";
const { ensureDirSync, readFileSync } = pkg;
import sharp from "sharp";
import { TypedRegEx } from "typed-regex";
const filePattern = TypedRegEx("^(?<path>.+)/(?<name>[A-z\-0-9]+)\.(?<extension>.+?)$");
export function convertRasterImages(srcRoot, outRootWebP) {
    const srcFiles = getAllFiles(srcRoot);
    srcFiles.forEach(file => {
        const pattern = filePattern.captures(file);
        if (!pattern) {
            throw new Error(`Unable to match against pattern ${filePattern.toString()} ${file}`);
        }
        const input = readFileSync(file);
        const oldFileName = pattern.name;
        const oldPath = pattern.path;
        const newPath = oldPath.replace(srcRoot, outRootWebP);
        const filePathOut = `${newPath}/${oldFileName}.webp`;
        ensureDirSync(newPath);
        void sharp(input).webp()
            .toFile(filePathOut);
    });
}
//# sourceMappingURL=convertRasterImages.js.map