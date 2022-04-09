import type { IHasId , IMoveOutcome } from "@json_out/index.js";

// FIXME: key with enum for move outcomes

export interface IMoveOutcomes extends IHasId {
  $id: string; // FIXME: outcome ID
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
}
