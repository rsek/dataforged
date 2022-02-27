
import fs from "fs";

const basePath = "./src/data";

export default function getSubdirs(dir = "", root = basePath): fs.PathLike[] {
  const path = dir.length ? root + "/" + dir : root;
  const result = fs
    .readdirSync(path)
    .filter(dir => !dir.startsWith("_") && !dir.includes("."))
    .map(str => (path + "/" + str));
  return result as fs.PathLike[];
}
