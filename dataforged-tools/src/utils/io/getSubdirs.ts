//License: MIT
import fs from "fs";

const basePath = "./src/data";

/**
 * It returns an array of all the subdirectories of the given directory.
 * @param dir - The directory to search in.
 * @param root - The root directory of the project.
 * @returns An array of paths.
 */
export function getSubdirs(dir = "", root = basePath): string[] {
  const path = dir.length ? root + "/" + dir : root;
  const result = fs
    .readdirSync(path)
    .filter(dir => !dir.startsWith("_") && !dir.includes("."))
    .map(str => (path + "/" + str));
  return result;
}
