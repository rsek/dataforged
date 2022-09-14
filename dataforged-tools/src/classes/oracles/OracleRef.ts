import type { OracleTable } from "@classes/index.js";

/**
 * @internal
 */
export class OracleTableRef {
  private $id: OracleTable["$id"];
  constructor(tableId: OracleTable["$id"]) {
    this.$id = tableId;
    this.getTable = this.getTable.bind(this);
  }
  getTable(keyedTables: Record<OracleTable["$id"], OracleTable>) {
    return keyedTables[this.$id];
  }
  toString() { return this.$id; }
  toJSON() { return this.$id; }
}