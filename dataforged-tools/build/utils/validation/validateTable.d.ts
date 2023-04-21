import type { IRow } from "../../json_out/index.js";
/**
 * It validates a table of dice rolls.
 * @param requireUniqueResults - If true, the table must have unique results.
 * @param requireAllD100 - If true, the sum of all the dice ranges must be 100.
 * @returns A boolean indicating whether the table is valid.
 */
export declare function validateTable(table: IRow[], requireUniqueResults?: boolean, requireAllD100?: boolean): boolean;
//# sourceMappingURL=validateTable.d.ts.map