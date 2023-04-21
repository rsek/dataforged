/**
 * Generic type: require specific keys to be NonNullable.
 * @public
 */
export declare type RequireKey<T, K extends string> = T & {
    [P in K]-?: NonNullable<T[P extends keyof T ? P : never]>;
};
//# sourceMappingURL=RequireKey.d.ts.map