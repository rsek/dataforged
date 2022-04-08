import type { RequireKey } from "@dataforged/utils/types/RequireKey.js";

/**
 * Make all properties of T nullable except for K, which is required.
 *
 */
type PartialExcept<T, K extends keyof T> = RequireKey<{
  [P in keyof T]?: T[P];
}, K>;

export { PartialExcept };