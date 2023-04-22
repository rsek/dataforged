
/**
 * @public
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/**
 * @public
 */
export type NullableKey<T, K> = {
  [P in keyof T]: P extends K ? T[P] | null : T[P]
};