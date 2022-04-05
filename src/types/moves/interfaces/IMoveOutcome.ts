import type { IWillHaveId } from "../../general/Id.js";
import type { ParagraphsString } from "../../general/StringTypes.js";

export default interface IMoveOutcome extends IWillHaveId {
  $id?: string;
  Text: ParagraphsString;
  "With a Match"?: IMoveOutcome | undefined;
}
