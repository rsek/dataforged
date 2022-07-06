export declare type KeysMatching<T, V> = {
    [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];
//# sourceMappingURL=KeysMatching.d.ts.map