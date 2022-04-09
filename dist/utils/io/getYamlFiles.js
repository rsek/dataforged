import fs from "fs";
const basePath = "./src/data";
export function getYamlFiles(dir = "", root = basePath) {
    const path = dir.length ? `${root.toString()}/${dir}` : root;
    return fs
        .readdirSync(path)
        .filter(file => !file.startsWith("_") && !file.startsWith(".") && file.match(/.*\.yaml/))
        .map(str => (`${path.toString()}/${str}`));
}
//# sourceMappingURL=getYamlFiles.js.map