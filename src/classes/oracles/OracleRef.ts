import type { Oracle } from "@classes/index.js";
import type { OracleTableId } from "@json_out/index.js";

/**
 * @internal
 */
export class OracleTableRef {
  private $id: OracleTableId;
  constructor(tableId: OracleTableId) {
    this.$id = tableId;
    this.getTable = this.getTable.bind(this);
  }
  getTable(keyedTables: Record<OracleTableId, Oracle>) {
    return keyedTables[this.$id];
  }
  toString() { return this.$id; }
  toJSON() { return this.$id; }
}