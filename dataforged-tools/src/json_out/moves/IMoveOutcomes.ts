import type { IHasId , IMoveOutcome, MoveId } from "@json_out/index.js";

// FIXME: key with enum for move outcomes
/**
 * @public
 */
export type MoveOutcomesId = `${MoveId}/Outcomes`;
/**
 * @public
 */
export interface IMoveOutcomes extends IHasId<MoveOutcomesId> {
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
}
