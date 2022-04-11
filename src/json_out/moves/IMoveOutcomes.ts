import type { IHasId , IMoveOutcome } from "@json_out/index.js";
import type { MoveId } from "@json_out/moves/MoveId.js";

// FIXME: key with enum for move outcomes

export type MoveOutcomesId = `${MoveId}/Outcomes`;

export interface IMoveOutcomes extends IHasId<MoveOutcomesId> {
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
}
