/// <reference types="node" />
import type { IYamlWithRef } from "@dataforged/yaml_in/index.js";
import fs from "fs";
export declare function concatWithYamlRefs<T>(referencePath?: fs.PathLike, ...filePaths: fs.PathLike[]): T & IYamlWithRef;
//# sourceMappingURL=concatWithYamlRefs.d.ts.map