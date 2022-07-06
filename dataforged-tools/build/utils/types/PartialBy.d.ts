export declare type PartialBy<T, K extends keyof any = ""> = Omit<T, K> & Partial<Pick<T, K extends keyof T ? K : never>>;
//# sourceMappingURL=PartialBy.d.ts.map