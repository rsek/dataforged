// export type PartialDeep<T> = Partial<{
//   [P in keyof T]:
//     T[P] extends Array<unknown> ?
//       (T[P] | undefined)
//       : Partial<T[P]>
// }>;

import { RequireKey } from "@schema";

/**
 * @public
 */
export type BlacklistPartial = "Label"

/**
 * @public
 */
export type RetainBlacklist<T> = {[P in keyof T as T[P] extends BlacklistPartial ? P : never]: T[P]}

/**
 * Makes a type where K is nullable.
 * @public
 */
export type PartialBy<T, K extends string> = Omit<T, K> & Partial<Pick<T, K extends keyof T? K : never>>;

/**
 * Similar to 'Partial', but recurses through all properties and their children, too. Use with care, as it can sometimes cause compiler segfaults. It's recommended to combine this with Omit if there's properties that you're sure you won't need (make {@link PartialDeep} the outermost generic type, in this case).
 *
 * @public
 */
export type PartialDeep<T> = Partial<{
  [P in keyof T]?: (
    // T[P] extends Array<infer AT> ? PartialDeep<AT[]>
    // :
    T[P] extends Record<string, unknown> ?
    PartialDeep<T[P]>
    : T[P]
  ) | undefined
}>;

/**
 * Makes a type where K and its properties are nullable.
 * @public
 */
export type PartialDeepBy<T, K extends string> = Omit<T, K> & PartialDeep<Pick<T, K extends keyof T ? K : never>>;

/**
 * Make all properties of T nullable except for K, which is required.
 * @public
 */
export type PartialExcept<T, K extends string> = RequireKey<{
  [P in keyof T]?: T[P];
}, K>;