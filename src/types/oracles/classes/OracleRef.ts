

import OracleTableId from "../OracleTableId";
import Oracle from "./Oracle";

export default class OracleTableRef {
  constructor(tableId: OracleTableId) {
    this.$id = tableId;
    this.getTable = this.getTable.bind(this);
  }
  private $id: OracleTableId;
  getTable(keyedTables: Record<OracleTableId, Oracle>) {
    return keyedTables[this.$id];
  }
  toString() { return this.$id; }
  toJSON() { return this.$id; }
}

