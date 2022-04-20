import type { IRowContentYaml, IRowYaml } from "../../yaml_in/index.js";
/**
 * Extracts the content of a Row array. In other words, it excludes the Floor and Ceiling numbers.
 * @param row - IRowYaml | IRowContentYaml
 * @returns A list of IRowContentYaml
 */
export declare function extractRowContent(row: IRowYaml | IRowContentYaml): IRowContentYaml;
//# sourceMappingURL=extractRowContent.d.ts.map