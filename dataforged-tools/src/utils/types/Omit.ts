/**
 * Omits "never" types.
 * @public
 */
export type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };

/**
 * Similar to "Omit", but recurses through any keyed object children to omit K from them, too.
 * @public
 */
export type OmitDeep<T, K extends string> = {
  [P in keyof T]: P extends K ? never : T[P] extends Record<string,unknown> ? OmitDeep<T[P], K> : T[P]
}