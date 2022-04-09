import type { Row } from "../../classes/index.js";
import type { IOracleBase, IRow, OracleTableId } from "../../json_out/index.js";
export declare function getTableByOracleId<T extends IRow[] = Row[]>(oracleData: IOracleBase | IOracleBase[], id: OracleTableId): T;
//# sourceMappingURL=getTableByOracleId.d.ts.map