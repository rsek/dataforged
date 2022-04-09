import type { IHasId, IHasText , ParagraphsString } from "@json_out/index.js";

export interface IMoveOutcome extends IHasId, IHasText {
  $id: string;
  Text: ParagraphsString;
  "With a Match"?: IMoveOutcome | undefined;
}
