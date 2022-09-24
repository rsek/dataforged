import type { OracleTableBuilder } from "@builders";

/**
 * @internal
 */
export class OracleTableRefBuilder {
  private $id: OracleTableBuilder["$id"];
  constructor(tableId: OracleTableBuilder["$id"]) {
    this.$id = tableId;
    this.getTable = this.getTable.bind(this);
  }
  getTable(keyedTables: Record<OracleTableBuilder["$id"], OracleTableBuilder>) {
    return keyedTables[this.$id];
  }
  toString() { return this.$id; }
  toJSON() { return this.$id; }
}