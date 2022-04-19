export declare type RequiredKeys<T> = {
    [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? never : K;
}[keyof T];
export declare type OptionalKeys<T> = {
    [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? K : never;
}[keyof T];
//# sourceMappingURL=TypeKeys.d.ts.map