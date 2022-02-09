import { OracleCategory } from "./OracleCategory";
import { OracleCategoryId, OracleTableId } from "./OracleId";
import { OracleInfo } from "./OracleInfo";

export class OracleTableRef {
  constructor(tableId: OracleTableId) {
    this._id = tableId;
    this.getTable = this.getTable.bind(this);
  }
  private _id: OracleTableId;
  getTable(keyedTables: Record<OracleTableId, OracleInfo>) {
    return keyedTables[this._id];
  }
  toString() { return this._id; }
  toJSON() { return this._id; }
}

export class OracleCategoryRef {
  constructor(tableId: OracleCategoryId) {
    this._id = tableId;
    this.getOracleCategory = this.getOracleCategory.bind(this);
  }
  private _id: OracleCategoryId;
  getOracleCategory(keyedOracleCategories: Record<OracleCategoryId, OracleCategory | OracleInfo>) {
    return keyedOracleCategories[this._id];
  }
  toString() { return this._id; }
  toJSON() { return this._id; }
}