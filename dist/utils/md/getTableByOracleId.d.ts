import type { Row } from "../../classes/index.js";
import type { IOracle, IOracleBase, IRow } from "../../json_out/index.js";
/**
 * Given an oracleData object, and an id, return the table object of the Oracle that matches the id
 * @param oracleData - The data to search.
 * @param id - The id of the table you want to get.
 * @returns An array of rows.
 */
export declare function getTableByOracleId<T extends IRow[] = Row[]>(oracleData: IOracleBase | IOracleBase[], id: IOracle["$id"]): T;
//# sourceMappingURL=getTableByOracleId.d.ts.map