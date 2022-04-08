/**
 * Makes a type where K is nullable.
 *
 */
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export { PartialBy };