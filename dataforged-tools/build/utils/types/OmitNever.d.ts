/**
 * @public
 */
export declare type OmitNever<T> = {
    [K in keyof T as T[K] extends never ? never : K]: T[K];
};
//# sourceMappingURL=OmitNever.d.ts.map