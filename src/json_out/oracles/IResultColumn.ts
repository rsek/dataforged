

// type KeysWithValueOfType<T, VT> = {
//   [P in keyof T as Exclude<>]: T[P] extends VT ? T[P] : never;
// }
// type KeysWithValueOfType<T extends VT> = ;
// type KeysWithValueOfType<T, ValueType> = {
//   [Key in keyof T as T[Key] extends ValueType]: T[Key];
// }

import type { Row } from "@dataforged/classes/oracles/Row.js";
import type { ITableColumnBase , OracleTableId } from "@dataforged/json_out/index.js";

// type RowKeysWithValueOfType = {
//   [Key in keyof Omit<Row, `$${string}`> as Row[Key] extends string ? Omit<Row,Key> : Key]: Key;
// }

// type filteredRow = Omit<Row, Row[keyof Row] extends string ? string : never>;

export interface IResultColumn extends ITableColumnBase {
  Label: string;
  "Use content from": OracleTableId;
  Key: keyof Row;
}
