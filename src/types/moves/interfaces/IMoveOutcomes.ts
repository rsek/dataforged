import { IWillHaveId } from "../../general/Id";
import IMoveOutcome from "./IMoveOutcome";


export default interface IMoveOutcomes extends IWillHaveId {
  $id?: string;
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
}
