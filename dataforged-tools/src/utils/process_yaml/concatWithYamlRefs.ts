//License: MIT
import { REFS_PATH } from "@constants/index.js";
import { loadYamlRefs } from "@utils/process_yaml/loadYamlRefs.js";
import { loadYamlTemplates } from "@utils/process_yaml/loadYamlTemplates.js";
import type { IYamlWithRef } from "@yaml_in/index.js";
import yaml from "js-yaml";
import fs from "fs";

/**
 * Concatenates YAML with reference objects.
 * @param referencePath - The path to the directory containing the reference files.
 * @param filePaths - The files to load.
 * @returns A JavaScript object with the following properties:
 */
export function concatWithYamlRefs<T>(referencePath: string = REFS_PATH, ...filePaths: string[]) {
  const refString = loadYamlRefs(referencePath);
  const templateString = loadYamlTemplates(referencePath + "/templates/");
  const fileStrings: string[] = filePaths.map(path => fs.readFileSync(path, { encoding: "utf-8" }));
  const dataStrings: string[] = [ refString, templateString, ...fileStrings ];
  const dataObject = yaml.load(dataStrings.join("\n\n")) as T & IYamlWithRef;
  return dataObject;
}

