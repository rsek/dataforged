/**
 * @public
 */
export declare type KeysWithValuesOfType<T, V> = keyof {
    [P in keyof T]: T[P] extends V | undefined ? V : never;
};
//# sourceMappingURL=KeysWithValuesOfType.d.ts.map