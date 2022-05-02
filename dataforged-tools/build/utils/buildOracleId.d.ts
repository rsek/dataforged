import type { Gamespace, IHasName } from "../json_out/index.js";
/**
 * Assembles a path-like oracle ID from a stack of the oracle and its ancestor objects.
 * @param ancestors - The ancestor objects of this oracle.
 * @returns
 */
export declare function buildOracleId<T extends string>(gamespace: Gamespace, ...ancestors: IHasName[]): T;
//# sourceMappingURL=buildOracleId.d.ts.map