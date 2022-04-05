
/**
 * Generic type: require specific keys to be NonNullable.
 * @date 4/5/2022 - 1:22:34 PM
 *
 * @export
 * @typedef {WithRequired}
 * @template T
 * @template K extends keyof T
 */
export type WithRequired<T, K extends keyof T> = T & {
  [P in K]-?: NonNullable<T[P]>;
};
