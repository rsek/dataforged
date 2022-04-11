import type { IMultipleRolls } from "../../json_out/index.js";
/**
 * Represents "Roll twice" and "Roll three times" oracle results.
 * @internal
 */
export declare class MultipleRolls implements IMultipleRolls {
    /**
     * In tabletop play, duplicate results are typically rerolled (p. XX). However, a handful of tables (such as Space Sighting) use multiple rolls to represent discrete objects (rather than features of a single game object), so duplicate results should be allowed.
     */
    Amount: number;
    /** The number of results to be generated from the oracle table. */
    "Allow duplicates": boolean;
    "Make it worse": boolean;
    constructor(json: IMultipleRolls);
}
//# sourceMappingURL=MultipleRolls.d.ts.map