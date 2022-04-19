"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleTableRef = void 0;
/**
 * @internal
 */
class OracleTableRef {
    constructor(tableId) {
        this.$id = tableId;
        this.getTable = this.getTable.bind(this);
    }
    getTable(keyedTables) {
        return keyedTables[this.$id];
    }
    toString() { return this.$id; }
    toJSON() { return this.$id; }
}
exports.OracleTableRef = OracleTableRef;
//# sourceMappingURL=OracleRef.js.map