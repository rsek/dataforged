import type { Oracle } from "../index.js";
/**
 * @internal
 */
export declare class OracleTableRef {
    private $id;
    constructor(tableId: Oracle["$id"]);
    getTable(keyedTables: Record<Oracle["$id"], Oracle>): Oracle;
    toString(): string;
    toJSON(): string;
}
//# sourceMappingURL=OracleRef.d.ts.map