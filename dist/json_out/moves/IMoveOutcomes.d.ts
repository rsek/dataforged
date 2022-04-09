import type { IHasId, IMoveOutcome } from "../index.js";
export interface IMoveOutcomes extends IHasId {
    $id: string;
    "Strong Hit": IMoveOutcome;
    "Weak Hit": IMoveOutcome;
    "Miss": IMoveOutcome;
}
//# sourceMappingURL=IMoveOutcomes.d.ts.map