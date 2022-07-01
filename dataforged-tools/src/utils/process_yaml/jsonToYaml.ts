//License: MIT
import fs from "fs-extra";
import yaml from "yaml";

// type JsonSerializable = Record<string,unknown> | Record<string,unknown>[];

/**
 * Converts a json object to a YAML file with standardized formatting.
 */
export function jsonToYaml(pathIn: `${string}.json`, pathOut: `${string}.${"yaml"|"yml"}` ,) {
  const data = yaml.stringify(fs.readJsonSync(pathIn), {
    indent: 2,
    blockQuote: false,
    doubleQuotedMinMultiLineLength: 40,
  });
  fs.writeFileSync(pathOut, data);
}

jsonToYaml("./src/_master-data/Ironsworn/Truths.json", "./src/_master-data/Ironsworn/Truths.yaml");