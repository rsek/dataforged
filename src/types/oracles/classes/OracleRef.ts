

import type Oracle from "./Oracle.js";
import type OracleTableId from "../OracleTableId.js";

export default class OracleTableRef {
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

