import type { IOracleCategoryYaml, IYamlWithRef } from "../../yaml_in/index.js";
export interface IOracleCatRoot extends IYamlWithRef {
    Categories: IOracleCategoryYaml[];
}
/**
 * Loads the oracle YAML data from the files and merges them into a single object.
 * @param referencePath - The path to the YAML file containing the references..
 * @param filePaths - The files to load.
 * @returns A JSON object with the following structure:
 */
export declare function loadOracleData(referencePath?: string, ...filePaths: string[]): IOracleCatRoot;
//# sourceMappingURL=loadOracleData.d.ts.map