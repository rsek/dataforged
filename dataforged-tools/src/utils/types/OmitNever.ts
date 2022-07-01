//License: MIT
export type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };