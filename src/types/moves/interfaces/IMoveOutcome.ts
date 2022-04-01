import type { IWillHaveId } from "../../general/Id.js";
import type MdString from "../../general/MdString.js";

export default interface IMoveOutcome extends IWillHaveId {
  $id?: string;
  Text: MdString;
  "With a Match"?: IMoveOutcome | undefined;
}
