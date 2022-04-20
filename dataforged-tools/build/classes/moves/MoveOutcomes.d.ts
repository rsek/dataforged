import type { IMoveOutcome, IMoveOutcomes } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class MoveOutcomes implements IMoveOutcomes {
    $id: IMoveOutcomes["$id"];
    "Strong Hit": IMoveOutcome;
    "Weak Hit": IMoveOutcome;
    "Miss": IMoveOutcome;
    constructor(json: Omit<IMoveOutcomes, "$id">, id: IMoveOutcomes["$id"]);
}
//# sourceMappingURL=MoveOutcomes.d.ts.map