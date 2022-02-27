

import fs from "fs";
const basePath: fs.PathLike = "./src/data";

export default function getYamlFiles(dir = "", root = basePath): fs.PathLike[] {
  const path = dir.length ? `${root.toString()}/${dir}` as fs.PathLike : root;
  return fs
    .readdirSync(path)
    .filter(file => !file.startsWith("_") && !file.startsWith(".") && file.match(/.*\.yaml/))
    .map(str => (`${path.toString()}/${str}`));
}
