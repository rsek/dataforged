import { IWillHaveId } from "../../general/Id";
import MdString from "../../general/MdString";

export default interface IMoveOutcome extends IWillHaveId {
  $id?: string;
  Text: MdString;
  "With a Match"?: IMoveOutcome | undefined;
}
