import type { IHasId, MoveId } from "../index.js";
import type { IOutcomeInfo, MoveOutcome } from "./IMoveOutcomeInfo.js";
/**
 * @public
 */
export declare type MoveOutcomesId = `${MoveId}/Outcomes`;
/**
 * @public
 */
export interface IMoveOutcomes extends IHasId<MoveOutcomesId> {
    [MoveOutcome.Strong_Hit]: IOutcomeInfo;
    [MoveOutcome.Weak_Hit]: IOutcomeInfo;
    [MoveOutcome.Miss]: IOutcomeInfo;
}
//# sourceMappingURL=IMoveOutcomes.d.ts.map