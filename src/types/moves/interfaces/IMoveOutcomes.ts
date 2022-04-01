import type IMoveOutcome from "./IMoveOutcome.js";
import type { IWillHaveId } from "../../general/Id.js";

export default interface IMoveOutcomes extends IWillHaveId {
  $id?: string;
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
}
