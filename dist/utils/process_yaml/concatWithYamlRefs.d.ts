import type { IYamlWithRef } from "../../yaml_in/index.js";
/**
 * Concatenates YAML with reference objects.
 * @param referencePath - The path to the directory containing the reference files.
 * @param filePaths - The files to load.
 * @returns A JavaScript object with the following properties:
 */
export declare function concatWithYamlRefs<T>(referencePath?: string, ...filePaths: string[]): T & IYamlWithRef;
//# sourceMappingURL=concatWithYamlRefs.d.ts.map