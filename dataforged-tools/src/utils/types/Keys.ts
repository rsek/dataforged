/**
 * @public
 */
export type KeysWithValuesOfType<T, V> = keyof {
  [P in keyof T]: T[P] extends V | undefined ? V : never;
};
/**
 * @public
 */
export type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];