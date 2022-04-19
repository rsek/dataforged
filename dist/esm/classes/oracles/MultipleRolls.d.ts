import type { IMultipleRolls } from "../../json_out/index.js";
/**
 * Represents "Roll twice" and "Roll three times" oracle results.
 * @internal
 */
export declare class MultipleRolls implements IMultipleRolls {
    Amount: number;
    "Allow duplicates": boolean;
    "Make it worse": boolean;
    constructor(json: Partial<IMultipleRolls>);
}
//# sourceMappingURL=MultipleRolls.d.ts.map