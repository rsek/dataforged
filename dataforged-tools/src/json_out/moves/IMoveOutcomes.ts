import type { IHasId, MoveId } from "@json_out/index.js";
import type { IOutcomeInfo, MoveOutcome } from "@json_out/moves/IMoveOutcomeInfo.js";

/**
 * @public
 */
export type MoveOutcomesId = `${MoveId}/Outcomes`;
/**
 * @public
 */
export interface IMoveOutcomes extends IHasId<MoveOutcomesId> {
  [MoveOutcome.Strong_Hit]: IOutcomeInfo;
  [MoveOutcome.Weak_Hit]: IOutcomeInfo;
  [MoveOutcome.Miss]: IOutcomeInfo;
}
