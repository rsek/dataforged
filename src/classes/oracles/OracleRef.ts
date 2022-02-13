

import { OracleTableId } from "./OracleId";
import { OracleInfo } from "./OracleInfo";

export class OracleTableRef {
  constructor(tableId: OracleTableId) {
    this.$id = tableId;
    this.getTable = this.getTable.bind(this);
  }
  private $id: OracleTableId;
  getTable(keyedTables: Record<OracleTableId, OracleInfo>) {
    return keyedTables[this.$id];
  }
  toString() { return this.$id; }
  toJSON() { return this.$id; }
}

