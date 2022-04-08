import type { IActionRoll, ParagraphsString } from "@dataforged/interfaces/json_out/index.js";
import type { IProgressRoll } from "@dataforged/interfaces/json_out/moves/IProgressRoll.js";


export default interface IMoveTriggerOptionYaml {
  Text?: ParagraphsString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
}
