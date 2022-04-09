import prettier from "prettier";
import fs from "fs";
export function writeJson(filePathOut, jsonObj, minified = false) {
    let parser = "json";
    let jsonData = JSON.stringify(jsonObj);
    if (minified === true) {
        parser = "json-stringify";
    }
    jsonData = prettier.format(jsonData, { parser });
    return fs.writeFileSync(filePathOut, jsonData);
}
//# sourceMappingURL=writeJSON.js.map