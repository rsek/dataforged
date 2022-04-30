import type { Oracle } from "../index.js";
import type { OracleTableId } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class OracleTableRef {
    private $id;
    constructor(tableId: OracleTableId);
    getTable(keyedTables: Record<Oracle["$id"], Oracle>): Oracle;
    toString(): string;
    toJSON(): string;
}
//# sourceMappingURL=OracleRef.d.ts.map