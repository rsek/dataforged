
/**
 * Describes {@link OracleTableRow} results that call for multiple rolls, most commonly "Roll twice" results.
 * @public
 */
export interface MultipleRolls {
  /**
   * An integer representing number of rolls to make on the parent oracle table.
   * @default 2
   */
  amount: number
  /**
   * Whether to allow duplicate results when generating multiple rolls.
   *
   * Implicitly required by {@link MultipleRolls.make_it_worse}
   */
  allow_duplicates: boolean
  /**
   * Whether duplicate rolls should be compounded in an Ironsworn-style "Make it worse" results.
   *
   * Typically this is accompanied by `Row.Result` text like "Roll twice more on this table. Both results occur. If they are the same result, make it worse."
   *
   * Can safely be ignored in Starforged-only implementations. Implicitly requires `Allow duplicates`.
   */
  make_it_worse: boolean
}
