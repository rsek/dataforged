/**
 * @public
 */
export type RequiredKeys<T> = { [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? never : K }[keyof T];
/**
 * @public
 */
export type OptionalKeys<T> = { [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? K : never }[keyof T];

