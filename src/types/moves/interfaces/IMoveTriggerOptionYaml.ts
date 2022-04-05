import type { IActionRoll, IProgressRoll } from "../../general/Roll.js";
import type { ParagraphsString } from "../../general/StringTypes.js";

export default interface IMoveTriggerOptionYaml {
  Text?: ParagraphsString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
}
