import yaml from "js-yaml";
import fs from "fs";

/**
 * Write a nicely formatted YAML file from a JSON object
 * @param filePathOut - The path to the file to write.
 * @param jsonObj - The JSON object to be converted to YAML.
 */
export default function writeYaml(filePathOut: fs.PathLike, jsonObj: object) {
  const yamlData = yaml.dump(jsonObj, {
    lineWidth: -1,
    quotingType: "\"",
    // noRefs: true,
  });
  fs.writeFileSync(filePathOut, yamlData);
}
