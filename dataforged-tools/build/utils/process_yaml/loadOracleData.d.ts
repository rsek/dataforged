import type { IOracleRoot } from "../../yaml_in/oracles/IOracleRoot.js";
/**
 * Loads the oracle YAML data from the files and merges them into a single object.
 * @param referencePath - The path to the YAML file containing the references..
 * @param filePaths - The files to load.
 * @returns A JSON object with the following structure:
 */
export declare function loadOracleData(referencePath?: string, ...filePaths: string[]): IOracleRoot;
//# sourceMappingURL=loadOracleData.d.ts.map