import type { HasDescription, HasId, HasSummary } from '@schema'

/**
 * Describes the string keys of this item that should be replaced with template strings and filled with the results of one or more oracles.
 * @public
 */
export interface RollTemplate extends HasId, Partial<HasSummary & HasDescription> {
  /**
   * @pattern ^(starforged|ironsworn)/[a-z_-]+/.+/roll_template$
   */
  $id: string
  /**
   * A template string for the parent's `Result` property, to be filled with an oracle table roll Result.
   * @localize
   * @example
   * ```json
   * "{{Starforged/Oracles/Factions/Affiliation}} of the {{Starforged/Oracles/Factions/Legacy}} {{Starforged/Oracles/Factions/Identity}}"
   * ```
   */
  Result?: string | undefined
  /**
   * A template string for the parent's `Summary` property, to be filled with an oracle table roll Result.
   * @localize
   */
  Summary?: string | undefined
  /**
   * A template string for the parent's `Description` property, to be filled with an oracle table roll Result.
   * @localize
   * @example
   * ```json
   * "Our computers are limited to simple digital systems and the most basic machine intelligence. This is because: {{Starforged/Setting_Truths/Artificial_Intelligence/1-33/Subtable}}.\n\nThe Adepts serve in place of those advanced systems. They utilize mind-altering drugs to see the universe as a dazzling lattice of data, identifying trends and predicting outcomes with uncanny accuracy. But to gain this insight they sacrifice much of themselves."
   * ```
   */
  Description?: string | undefined
}
