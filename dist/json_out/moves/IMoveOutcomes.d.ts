import type { IHasId, IMoveOutcome } from "../index.js";
import type { MoveId } from "./MoveId.js";
export declare type MoveOutcomesId = `${MoveId}/Outcomes`;
export interface IMoveOutcomes extends IHasId<MoveOutcomesId> {
    "Strong Hit": IMoveOutcome;
    "Weak Hit": IMoveOutcome;
    "Miss": IMoveOutcome;
}
//# sourceMappingURL=IMoveOutcomes.d.ts.map