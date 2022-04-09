import type { IHasId, IMoveOutcome } from "@dataforged/json_out/index.js";
export interface IMoveOutcomes extends IHasId {
    $id: string;
    "Strong Hit": IMoveOutcome;
    "Weak Hit": IMoveOutcome;
    "Miss": IMoveOutcome;
}
//# sourceMappingURL=IMoveOutcomes.d.ts.map