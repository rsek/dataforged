import type { IHasId, IHasText } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";

export interface IMoveOutcome extends IHasId, IHasText {
  $id: string;
  Text: ParagraphsString;
  "With a Match"?: IMoveOutcome | undefined;
}
