/**
 * @internal
 */
export class OracleTableRef {
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
