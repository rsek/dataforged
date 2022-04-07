import type { IActionRoll, IProgressRoll } from "@dataforged/classes/moves/MoveRoll.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";

export default interface IMoveTriggerOptionYaml {
  Text?: ParagraphsString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
}
