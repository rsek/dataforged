import { REFS_PATH } from "../../constants";
import { loadYamlRefs } from "./loadYamlRefs.js";
import { loadYamlTemplates } from "./loadYamlTemplates.js";
import yaml from "js-yaml";
import fs from "fs";
import _ from "lodash";
/**
 * Concatenates YAML with reference objects.
 * @param referencePath - The path to the directory containing the reference files.
 * @param filePaths - The files to load.
 * @returns A JavaScript object with the following properties:
 */
export function concatWithYamlRefs(referencePath = REFS_PATH, ...filePaths) {
    const refString = loadYamlRefs(referencePath);
    const templateString = loadYamlTemplates(referencePath + "/templates/");
    const fileStrings = filePaths.map(path => fs.readFileSync(path, { encoding: "utf-8" }));
    const refsString = refString + "\n\n" + templateString;
    const dataObject = fileStrings.map(yamlString => yaml.load(refsString + "\n\n" + yamlString)).reduce((prev, current) => _.merge(prev, current), {});
    return dataObject;
}
//# sourceMappingURL=concatWithYamlRefs.js.map