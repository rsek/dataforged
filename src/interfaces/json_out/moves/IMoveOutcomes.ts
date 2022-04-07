import type { IHasId } from "@dataforged/interfaces/json_out/common/IHas.js";
import type IMoveOutcome from "@dataforged/interfaces/json_out/moves/IMoveOutcome.js";

// FIXME: key with enum for move outcomes

export default interface IMoveOutcomes extends IHasId {
  $id: string; // FIXME: outcome ID
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
}
