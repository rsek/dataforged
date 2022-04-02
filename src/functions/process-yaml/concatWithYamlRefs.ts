

import yaml from "js-yaml";
import fs from "fs";
import loadYamlRefs from "./loadYamlRefs.js";
import buildTemplates from "./loadYamlTemplates.js";
import type IYamlWithRef from "../IYamlWithRef.js";
export const refsPath: fs.PathLike = "./src/data/oracles/_refs/";

/**
 * Concatenates YAML with reference objects.
 * @param referencePath - The path to the directory containing the reference files.
 * @param {fs.PathLike[]} filePaths - The files to load.
 * @returns A JavaScript object with the following properties:
 */
export default function concatWithYamlRefs<T>(referencePath: fs.PathLike = refsPath, ...filePaths: fs.PathLike[]) {
  const refFiles: fs.PathLike[] = fs.readdirSync(refsPath);
  const refString = loadYamlRefs(referencePath);
  const templateString = buildTemplates(referencePath.toString() + "/templates/");
  const fileStrings: string[] = filePaths.map(path => fs.readFileSync(path, { encoding: "utf-8" }));
  const dataStrings: string[] = [ refString, templateString, ...fileStrings ];
  const dataObject = yaml.load(dataStrings.join("\n\n")) as T & IYamlWithRef;
  return dataObject;
}

