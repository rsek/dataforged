//License: MIT
export type PartialDeep<T> = Partial<{
  [P in keyof T]:
    T[P] extends Array<unknown> ?
      (T[P] | undefined)
      : Partial<T[P]>
}>;