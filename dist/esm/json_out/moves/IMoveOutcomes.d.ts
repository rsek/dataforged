import type { IHasId, IMoveOutcome, MoveId } from "../index.js";
/**
 * @public
 */
export declare type MoveOutcomesId = `${MoveId}/Outcomes`;
/**
 * @public
 */
export interface IMoveOutcomes extends IHasId<MoveOutcomesId> {
    "Strong Hit": IMoveOutcome;
    "Weak Hit": IMoveOutcome;
    "Miss": IMoveOutcome;
}
//# sourceMappingURL=IMoveOutcomes.d.ts.map