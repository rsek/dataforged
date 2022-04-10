import type { IHasName } from "../json_out/index.js";
/**
 * Assembles a path-like oracle ID from a stack of the oracle and its ancestor objects.
 *
 * @param lineage - The ancestor objects of this oracle.
 * @returns
 */
export declare function buildOracleId(...lineage: IHasName[]): string;
//# sourceMappingURL=buildOracleId.d.ts.map