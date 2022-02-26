
import t from 'ts-runtime/lib';
import yaml from "js-yaml";
import fs from "fs";

export default function writeYaml(filePathOut: fs.PathLike, jsonObj: object) {
  const yamlData = yaml.dump(jsonObj, {
    lineWidth: -1,
    quotingType: "\""

  });
  fs.writeFileSync(filePathOut, yamlData);
}
