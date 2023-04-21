/**
 * The stat(s) or progress track(s) that may be rolled with the parent move trigger option.
 * @public
 */
export enum RollMethod {
  /**
   * When rolling with this move trigger option, *every* stat or progress track of the `Using` key is rolled.
   */
    All = "All",
  /**
   * When rolling with this move trigger option, use the highest/best option from the `Using` key.
   */
    Highest = "Highest",
  /**
   * When rolling with this move trigger option, use the lowest/worst option from the `Using` key.
   */
  Lowest = "Lowest",
  /**
   * When rolling with this move trigger option, the user picks which stat to use.
   *
   * This is the default option for triggers that offer a single stat.
   */
  Any = "Any",
  /**
   * This move trigger option has no roll method of its own, and must inherit its roll from another move trigger option.
   *
   * If the parent's `Using` is defined, the inherited roll must use one of those stats/progress tracks.
   *
   * Typically appears on children of `IAlterMove`.
   */
  Inherit = "Inherit",
  /**
   * The move trigger option results in an automatic strong hit - no roll required.
   */
  StrongHit = "Strong Hit",
  /**
   * The move trigger option results in an automatic weak hit - no roll required.
   */
  WeakHit = "Weak Hit"
}
/**
 * @public
 */
export enum RollType {
    Action = "Action roll",
    Progress = "Progress roll"
    // TODO: add 'Any'?
}

