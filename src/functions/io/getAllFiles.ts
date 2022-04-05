import fs from "fs";
import path from "path";

/**
 * Recursively gets the path of all YAML files in a directory.
 * @date 4/5/2022 - 1:51:45 AM
 *
 * @export
 * @param {string} dirPath
 * @param {Array<string>} [arrayOfFiles=[]]
 * @returns {*}
 */
export default function getAllFiles(dirPath: string, arrayOfFiles: Array<string> = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(function (file) {
    if (fs.statSync(dirPath.toString() + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath.toString() + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(
        path.join(
          // use __dirname instead of "./" for absolute paths
          "./",
          dirPath.toString(),
          "/", file));
    }
  });
  return arrayOfFiles;
}