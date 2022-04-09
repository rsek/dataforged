/// <reference types="node" />
import type { IOracleCategoryYaml, IYamlWithRef } from "../../yaml_in/index.js";
import type fs from "fs";
export interface IOracleCatRoot extends IYamlWithRef {
    Categories: IOracleCategoryYaml[];
}
export declare function loadOracleData(referencePath?: fs.PathLike, ...filePaths: fs.PathLike[]): IOracleCatRoot;
//# sourceMappingURL=loadOracleData.d.ts.map