import { REFS_PATH } from "@constants";
import { loadYamlRefs } from "@utils/yaml/loadYamlRefs.js";
import { loadYamlTemplates } from "@utils/yaml/loadYamlTemplates.js";
import type { YamlWithRef } from "@schema";
import yaml from "js-yaml";
import fs from "fs";
import _ from "lodash";

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
  const refsString = refString + "\n\n" + templateString;
  const dataObject = fileStrings.map(yamlString => yaml.load(refsString + "\n\n" + yamlString)).reduce((prev,current) => _.merge(prev,current), {})
  return dataObject as T & YamlWithRef;
}

