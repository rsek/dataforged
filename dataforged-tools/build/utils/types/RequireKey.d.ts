export declare type RequireKey<T, K extends keyof any = ""> = T & {
    [P in K]-?: NonNullable<T[P extends keyof T ? P : never]>;
};
//# sourceMappingURL=RequireKey.d.ts.map