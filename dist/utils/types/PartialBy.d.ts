declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export { PartialBy };
//# sourceMappingURL=PartialBy.d.ts.map