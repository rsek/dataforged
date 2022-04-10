/// <reference types="node" />
import type { IYamlWithRef } from "../../yaml_in/index.js";
import fs from "fs";
/**
 * Concatenates YAML with reference objects.
 * @param referencePath - The path to the directory containing the reference files.
 * @param filePaths - The files to load.
 * @returns A JavaScript object with the following properties:
 */
export declare function concatWithYamlRefs<T>(referencePath?: fs.PathLike, ...filePaths: fs.PathLike[]): T & IYamlWithRef;
//# sourceMappingURL=concatWithYamlRefs.d.ts.map