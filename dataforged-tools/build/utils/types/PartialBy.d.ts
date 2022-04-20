/**
 * Makes a type where K is nullable.
 * @public
 */
export declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
//# sourceMappingURL=PartialBy.d.ts.map