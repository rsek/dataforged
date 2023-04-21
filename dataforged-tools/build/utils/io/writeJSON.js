import prettier from 'prettier';
import fs from 'fs';
/**
 * Writes a JSON object to a nicely formatted file.
 *
 */
export function writeJson(filePathOut, jsonObj, minified = false) {
    let parser = 'json';
    let jsonData = JSON.stringify(jsonObj);
    if (minified) {
        parser = 'json-stringify';
    }
    jsonData = prettier.format(jsonData, { parser });
    return fs.writeFileSync(filePathOut, jsonData);
}
//# sourceMappingURL=writeJSON.js.map