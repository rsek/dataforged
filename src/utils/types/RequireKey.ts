/**
 * Generic type: require specific keys to be NonNullable.
 */
export type RequireKey<T, K extends keyof T> = T & {
  [P in K]-?: NonNullable<T[P]>;
};
