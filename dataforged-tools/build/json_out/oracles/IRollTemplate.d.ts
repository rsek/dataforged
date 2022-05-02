/**
 * Describes the string keys of this item that should be replaced with template strings and filled with the results of one or more oracles.
 * @public
 */
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
//# sourceMappingURL=IRollTemplate.d.ts.map