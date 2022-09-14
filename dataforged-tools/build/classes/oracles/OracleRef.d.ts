import type { OracleTable } from "../index.js";
/**
 * @internal
 */
export declare class OracleTableRef {
    private $id;
    constructor(tableId: OracleTable["$id"]);
    getTable(keyedTables: Record<OracleTable["$id"], OracleTable>): OracleTable;
    toString(): string;
    toJSON(): string;
}
//# sourceMappingURL=OracleRef.d.ts.map