import REFS_PATH from "@dataforged/constants/refsPath.js";
import type IYamlWithRef from "@dataforged/interfaces/yaml_in/common/IYamlWithRef.js";
import loadYamlRefs from "@dataforged/utils/process_yaml/loadYamlRefs.js";
import loadYamlTemplates from "@dataforged/utils/process_yaml/loadYamlTemplates.js";
import yaml from "js-yaml";
import fs from "fs";

/**
 * Concatenates YAML with reference objects.
 * @param referencePath - The path to the directory containing the reference files.
 * @param filePaths - The files to load.
 * @returns A JavaScript object with the following properties:
 */
export default function concatWithYamlRefs<T>(referencePath: fs.PathLike = REFS_PATH, ...filePaths: fs.PathLike[]) {
  const refFiles: fs.PathLike[] = fs.readdirSync(REFS_PATH);
  const refString = loadYamlRefs(referencePath);
  const templateString = loadYamlTemplates(referencePath.toString() + "/templates/");
  const fileStrings: string[] = filePaths.map(path => fs.readFileSync(path, { encoding: "utf-8" }));
  const dataStrings: string[] = [ refString, templateString, ...fileStrings ];
  const dataObject = yaml.load(dataStrings.join("\n\n")) as T & IYamlWithRef;
  return dataObject;
}

