/**
 * Makes a type where K is nullable.
 * @public
 */
export type PartialBy<T, K extends keyof any =""> = Omit<T, K> & Partial<Pick<T, K extends keyof T? K : never>>;