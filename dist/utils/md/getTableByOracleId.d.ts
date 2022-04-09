import type { Row } from "../../../dist/classes/oracles/Row.js";
import type { IOracleBase, IRow, OracleTableId } from "../../../dist/json_out/index.js";
export declare function getTableByOracleId<T extends IRow[] = Row[]>(oracleData: IOracleBase | IOracleBase[], id: OracleTableId): T;
//# sourceMappingURL=getTableByOracleId.d.ts.map