import fs from "fs";
import path from "path";
export function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(function (file) {
        if (fs.statSync(dirPath.toString() + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath.toString() + "/" + file, arrayOfFiles);
        }
        else {
            arrayOfFiles.push(path.join("./", dirPath.toString(), "/", file));
        }
    });
    return arrayOfFiles;
}
//# sourceMappingURL=getAllFiles.js.map