import type { OracleTableBuilder } from "@builders";
import type { OracleTable } from "@schema";

/**
 * @internal
 */
export class OracleTableRefBuilder {
  private $id: OracleTable["$id"];
  constructor(tableId: OracleTable["$id"]) {
    this.$id = tableId;
    this.getTable = this.getTable.bind(this);
  }
  getTable(keyedTables: Record<OracleTableBuilder["$id"], OracleTableBuilder>) {
    return keyedTables[this.$id];
  }
  toString() { return this.$id; }
  toJSON() { return this.$id; }
}