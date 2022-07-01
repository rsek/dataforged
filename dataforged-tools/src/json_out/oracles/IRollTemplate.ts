//License: MIT
export interface IRollTemplate {
  /**
   * A template string for the parent's `Result` property, to be filled with an oracle table roll Result.
   */
  Result?: string | undefined;
  /**
   * A template string for the parent's `Summary` property, to be filled with an oracle table roll Result.
   */
  Summary?: string | undefined;
  /**
   * A template string for the parent's `Description` property, to be filled with an oracle table roll Result.
   */
  Description?: string | undefined;
}