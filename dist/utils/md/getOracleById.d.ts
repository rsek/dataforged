import type { Oracle } from "../../classes/index.js";
import type { IOracle, IOracleBase } from "../../json_out/index.js";
/**
 * Given an array of oracle data and an id, return the oracle data that matches the id. Slow!
 * @param oracleData - The data to search in.
 * @param id - The id of the oracle you want to get.
 * @returns An Oracle object.
 */
export declare function getOracleById(oracleData: IOracleBase | IOracleBase[], id: IOracle["$id"]): Oracle;
//# sourceMappingURL=getOracleById.d.ts.map