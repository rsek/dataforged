import type IMoveOutcome from "./IMoveOutcome.js";
import type { IWillHaveId } from "../../general/Id.js";

export default interface IMoveOutcomes extends IWillHaveId {
  $id?: string; // FIXME: does this need its own ID?
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
}
