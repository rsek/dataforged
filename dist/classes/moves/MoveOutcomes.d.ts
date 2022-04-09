import type { IMoveOutcome, IMoveOutcomes } from "../../json_out/index.js";
export declare class MoveOutcomes implements IMoveOutcomes {
    $id: string;
    "Strong Hit": IMoveOutcome;
    "Weak Hit": IMoveOutcome;
    "Miss": IMoveOutcome;
    constructor(json: Omit<IMoveOutcomes, "$id">, id: string);
}
//# sourceMappingURL=MoveOutcomes.d.ts.map