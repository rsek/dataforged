
/**
 * Describes {@link IRow} results that call for multiple rolls, most commonly "Roll twice" results.
 * @public
 */
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
export interface IMultipleRolls {
  /**
   * The number of rolls to make on the parent oracle table.
   */
  Amount: number;
  /**
   * Whether to allow duplicate results when generating multiple rolls.
   *
   * Implicitly required by `Make it worse`.
   */
  "Allow duplicates": boolean;
  /**
   * Whether duplicate rolls should be compounded in an Ironsworn-style "Make it worse" results.
   *
   * Typically this is accompanied by `IRow.Result` text like "Roll twice more on this table. Both results occur. If they are the same result, make it worse."
   *
   * Can safely be ignored in Starforged-only implementations. Implicitly requires `Allow duplicates`.
   */
  "Make it worse": boolean;
}
