

import fs from "fs";
import prettier from "prettier";

/**
 * Writes a JSON object to a nicely formatted file.
 *
 */
export default function writeJson(filePathOut: fs.PathLike, jsonObj: object, minified = false): void {
  let parser = "json";
  let jsonData = JSON.stringify(jsonObj);
  if (minified === true) {
    parser = "json-stringify";
  }
  jsonData = prettier.format(jsonData, { parser });
  return fs.writeFileSync(filePathOut, jsonData);
}