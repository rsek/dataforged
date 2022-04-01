import type ITableColumn from "./ITableColumn.js";
import type Row from "../classes/Row.js";
import type OracleTableId from "../OracleTableId.js";

// type KeysWithValueOfType<T, VT> = {
//   [P in keyof T as Exclude<>]: T[P] extends VT ? T[P] : never;
// }
// type KeysWithValueOfType<T extends VT> = ;
// type KeysWithValueOfType<T, ValueType> = {
//   [Key in keyof T as T[Key] extends ValueType]: T[Key];
// }

// type RowKeysWithValueOfType = {
//   [Key in keyof Omit<Row, `$${string}`> as Row[Key] extends string ? Omit<Row,Key> : Key]: Key;
// }

// type filteredRow = Omit<Row, Row[keyof Row] extends string ? string : never>;

export default interface IResultColumn extends ITableColumn {
  Label: string;
  Content: OracleTableId;
  Key: keyof Row;
}
