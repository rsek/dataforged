import type { RequireKey } from "@utils/types/RequireKey.js";

/**
 * Make all properties of T nullable except for K, which is required.
 * @public
 */
export type PartialExcept<T, K extends keyof any=""> = RequireKey<{
  [P in keyof T]?: T[P];
}, K>;