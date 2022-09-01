/**
 * @public
 */
export type KeysWithValuesOfType<T, V> = keyof {
  [P in keyof T]: T[P] extends V | undefined ? V : never;
};
