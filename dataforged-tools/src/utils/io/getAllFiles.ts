import fs from "fs";
import path from "path";

/**
 * Recursively gets the path of all YAML files in a directory.
 *
 * @param dirPath - the path to the directory.
 * @param arrayOfFiles - an array of file paths for the function to add paths too (used mainly for recursing)
 * @returns An array of file paths.
 */
export function getAllFiles(dirPath: string, arrayOfFiles: Array<string> = []) {
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