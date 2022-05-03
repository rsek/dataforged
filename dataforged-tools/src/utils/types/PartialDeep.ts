/**
 * Only recurses a couple times so it doesn't cause an infinite loop during schema generation.
 * @public
 */
export type PartialDeep<T> = Partial<{
  [P in keyof T]:
    T[P] extends Array<unknown> ?
      (T[P] | undefined)
      : Partial<T[P]>
}>;