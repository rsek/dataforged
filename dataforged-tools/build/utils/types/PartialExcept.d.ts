import type { RequireKey } from "./RequireKey.js";
/**
 * Make all properties of T nullable except for K, which is required.
 * @public
 */
export declare type PartialExcept<T, K extends keyof T> = RequireKey<{
    [P in keyof T]?: T[P];
}, K>;
//# sourceMappingURL=PartialExcept.d.ts.map