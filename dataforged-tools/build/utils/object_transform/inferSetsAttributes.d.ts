import type { IAttribute, IRow } from "../../json_out/index.js";
/**
 * Infers a SetsAttributes object for an Oracle from its table rows.
 * @param table - The table of data to infer attributes from.
 * @returns An array of objects with a single property called Key.
 */
export declare function inferSetsAttributes(table: IRow[]): IAttribute[];
//# sourceMappingURL=inferSetsAttributes.d.ts.map